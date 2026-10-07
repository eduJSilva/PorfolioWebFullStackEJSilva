import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, Icon],
  template: `
    <main class="auth-page">
      <div class="auth-card reveal">
        <a routerLink="/" class="back"><app-icon name="arrowLeft" [size]="16" /> Volver al portfolio</a>
        <h1>Ingresar</h1>
        <p class="muted" style="margin-bottom: 24px">Acceso para administrar el contenido del portfolio.</p>

        @if (confirmado()) {
          <div class="alert alert--success" style="margin-bottom: 16px">
            <app-icon name="check" /> Tu email fue verificado. Ya podés ingresar.
          </div>
        }
        @if (error()) {
          <div class="alert alert--error" style="margin-bottom: 16px" role="alert">
            <app-icon name="alert" /> {{ error() }}
          </div>
        }

        <form class="form" [formGroup]="form" (ngSubmit)="submit()">
          <div class="field">
            <label for="email">Email</label>
            <input id="email" class="input" type="email" formControlName="email" autocomplete="username" />
            @if (form.controls.email.touched && form.controls.email.invalid) {
              <span class="error">Ingresá un email válido.</span>
            }
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <input id="password" class="input" [type]="showPassword() ? 'text' : 'password'" formControlName="password"
                autocomplete="current-password" />
              <button type="button" class="icon-btn" (click)="showPassword.set(!showPassword())"
                [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                <app-icon [name]="showPassword() ? 'eyeOff' : 'eye'" [size]="18" />
              </button>
            </div>
            @if (form.controls.password.touched && form.controls.password.invalid) {
              <span class="error">La contraseña es obligatoria.</span>
            }
          </div>
          <button class="btn btn--primary btn--block" type="submit" [disabled]="loading()">
            {{ loading() ? 'Ingresando…' : 'Ingresar' }}
          </button>
          <a routerLink="/recuperar" style="text-align: center; font-size: 0.9rem">¿Olvidaste tu contraseña?</a>
        </form>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  /** ?confirmado=true al volver del link de verificación de email */
  readonly confirmado = input<string>();

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly showPassword = signal(false);
  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => {
        this.loading.set(false);
        if (this.auth.isAdmin()) {
          this.toast.success('Sesión iniciada. Ya podés editar el portfolio.');
        } else {
          this.toast.show('Sesión iniciada. Tu usuario no tiene permisos de edición.');
        }
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(
          err.status === 0
            ? 'No se pudo conectar con el servidor. Probá de nuevo en unos segundos.'
            : 'Email o contraseña incorrectos.',
        );
      },
    });
  }
}
