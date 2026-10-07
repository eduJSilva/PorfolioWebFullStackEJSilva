import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/theme.service';
import { ConfirmHost } from './shared/confirm';
import { ToastHost } from './shared/toast-host';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastHost, ConfirmHost],
  template: `
    <router-outlet />
    <app-toast-host />
    <app-confirm-host />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Se instancia acá para aplicar el tema desde el arranque
  protected readonly theme = inject(ThemeService);
}
