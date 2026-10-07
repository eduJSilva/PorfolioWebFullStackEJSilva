import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse } from './models';

interface Session {
  accessToken: string;
  refreshToken: string;
  email: string;
}

interface JwtPayload {
  sub?: string;
  exp?: number;
  authorities?: string;
}

const SESSION_KEY = 'portfolio.session';
const DEVICE_KEY = 'portfolio.deviceId';

function decodeJwt(token: string): JwtPayload | null {
  try {
    const part = token.split('.')[1];
    const binary = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as JwtPayload;
  } catch {
    return null;
  }
}

function readStorage(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

/** Sesión del administrador (JWT emitido por /api/auth/login). */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;
  private readonly session = signal<Session | null>(this.restore());

  readonly email = computed(() => this.session()?.email ?? null);
  readonly isAdmin = computed(() => {
    const token = this.validToken();
    const authorities = token ? decodeJwt(token)?.authorities ?? '' : '';
    return authorities.split(',').includes('ROLE_ADMIN');
  });

  /** Devuelve el access token solo si no está vencido. */
  validToken(): string | null {
    const s = this.session();
    if (!s) return null;
    const exp = decodeJwt(s.accessToken)?.exp;
    if (exp && exp * 1000 <= Date.now()) {
      this.clear();
      return null;
    }
    return s.accessToken;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.url}api/auth/login`, {
        email,
        password,
        deviceInfo: this.deviceInfo(),
      })
      .pipe(
        tap((res) => {
          const session: Session = { accessToken: res.accessToken, refreshToken: res.refreshToken, email };
          this.session.set(session);
          try {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
          } catch {
            /* almacenamiento no disponible: la sesión vive solo en memoria */
          }
        }),
      );
  }

  logout(): Observable<unknown> {
    return this.http
      .post(`${this.url}api/user/logout`, { deviceInfo: this.deviceInfo() })
      .pipe(finalize(() => this.clear()));
  }

  requestPasswordReset(email: string): Observable<unknown> {
    return this.http.post(`${this.url}api/auth/password/resetlink`, { email });
  }

  resetPassword(body: { email: string; password: string; confirmPassword: string; token: string }): Observable<unknown> {
    return this.http.post(`${this.url}api/auth/password/reset`, body);
  }

  clear(): void {
    this.session.set(null);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* noop */
    }
  }

  private restore(): Session | null {
    const raw = readStorage(sessionStorage, SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Session;
    } catch {
      return null;
    }
  }

  private deviceInfo() {
    let id = readStorage(localStorage, DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      try {
        localStorage.setItem(DEVICE_KEY, id);
      } catch {
        /* noop */
      }
    }
    return { deviceId: id, deviceType: 'DEVICE_TYPE_ANDROID', notificationToken: null };
  }
}
