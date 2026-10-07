import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-recuperar-page',
  imports: [ReactiveFormsModule, RouterLink, Icon],
  template: `
    <main class="auth-page">
      <div class="auth-card reveal">
        <a routerLink="/login" class="back"><app-icon name="arrowLeft" [size]="16" /> Volver a ingresar</a>
        <h1>Recuperar contraseña</h1>
        <p class="muted" style="margin-bottom: 24px">Te enviaremos un link para crear una contraseña nueva.</p>

        @if (sent()) {
          <div class="alert alert--success" role="status">
            <app-icon name="check" /> Si el email está registrado, vas a recibir un link en los próximos minutos.
          </div>
        } @else {
          @if (error()) {
            <div class="alert alert--error" style="margin-bottom: 16px" role="alert">
              <app-icon name="alert" /> {{ error() }}
            </div>
          }
          <form class="form" [formGroup]="form" (ngSubmit)="submit()">
            <div class="field">
              <label for="email">Email</label>
              <input id="email" class="input" type="email" formControlName="email" autocomplete="email" />
            </div>
            <button class="btn btn--primary btn--block" type="submit" [disabled]="loading() || form.invalid">
              {{ loading() ? 'Enviando…' : 'Enviar link' }}
            </button>
          </form>
        }
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecuperarPage {
  private readonly auth = inject(AuthService);
  protected readonly loading = signal(false);
  protected readonly sent = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    this.loading.set(true);
    this.error.set(null);
    this.auth.requestPasswordReset(this.form.getRawValue().email).subscribe({
      next: () => {
        this.loading.set(false);
        this.sent.set(true);
      },
      error: (err) => {
        this.loading.set(false);
        // No revelamos si el email existe o no
        if (err.status === 0 || err.status >= 500) {
          this.error.set('No se pudo enviar el email. Probá de nuevo más tarde.');
        } else {
          this.sent.set(true);
        }
      },
    });
  }
}
