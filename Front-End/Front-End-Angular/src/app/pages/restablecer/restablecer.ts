import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';
import { Icon } from '../../shared/icon';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const { password, confirmPassword } = group.value as { password: string; confirmPassword: string };
  return password === confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'app-restablecer-page',
  imports: [ReactiveFormsModule, RouterLink, Icon],
  template: `
    <main class="auth-page">
      <div class="auth-card reveal">
        <a routerLink="/login" class="back"><app-icon name="arrowLeft" [size]="16" /> Volver a ingresar</a>
        <h1>Nueva contraseña</h1>

        @if (!token()) {
          <div class="alert alert--error" style="margin-top: 16px" role="alert">
            <app-icon name="alert" /> El link no es válido. Pedí uno nuevo desde
            <a routerLink="/recuperar">recuperar contraseña</a>.
          </div>
        } @else {
          <p class="muted" style="margin-bottom: 24px">Elegí una contraseña de al menos 8 caracteres.</p>
          @if (error()) {
            <div class="alert alert--error" style="margin-bottom: 16px" role="alert">
              <app-icon name="alert" /> {{ error() }}
            </div>
          }
          <form class="form" [formGroup]="form" (ngSubmit)="submit()">
            <div class="field">
              <label for="email">Email</label>
              <input id="email" class="input" type="email" formControlName="email" autocomplete="username" />
            </div>
            <div class="field">
              <label for="password">Contraseña nueva</label>
              <input id="password" class="input" type="password" formControlName="password" autocomplete="new-password" />
              @if (form.controls.password.touched && form.controls.password.invalid) {
                <span class="error">Mínimo 8 caracteres.</span>
              }
            </div>
            <div class="field">
              <label for="confirm">Repetir contraseña</label>
              <input id="confirm" class="input" type="password" formControlName="confirmPassword" autocomplete="new-password" />
              @if (form.controls.confirmPassword.touched && form.hasError('mismatch')) {
                <span class="error">Las contraseñas no coinciden.</span>
              }
            </div>
            <button class="btn btn--primary btn--block" type="submit" [disabled]="loading() || form.invalid">
              {{ loading() ? 'Guardando…' : 'Guardar contraseña' }}
            </button>
          </form>
        }
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestablecerPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  /** Token recibido en el link del email (?token=...) */
  readonly token = input<string>();

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly form = inject(NonNullableFormBuilder).group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch },
  );

  submit(): void {
    const token = this.token();
    if (!token || this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.auth.resetPassword({ ...this.form.getRawValue(), token }).subscribe({
      next: () => {
        this.toast.success('Contraseña actualizada. Ya podés ingresar.');
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.loading.set(false);
        this.error.set('No se pudo cambiar la contraseña. El link puede haber vencido o el email no coincide.');
      },
    });
  }
}
