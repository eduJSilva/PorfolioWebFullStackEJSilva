import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, Icon],
  template: `
    <main class="auth-page">
      <div class="auth-card reveal" style="text-align: center">
        <p class="eyebrow" style="justify-content: center">Error 404</p>
        <h1>Página no encontrada</h1>
        <p class="muted" style="margin: 8px 0 24px">La dirección que buscás no existe o fue movida.</p>
        <a routerLink="/" class="btn btn--primary"><app-icon name="arrowLeft" [size]="18" /> Ir al portfolio</a>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
