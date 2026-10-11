import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { SOCIAL_LINKS } from '../core/links';
import { PortfolioStore } from '../core/portfolio.store';
import { Icon } from '../shared/icon';
import { revisionLabel } from './navbar';

@Component({
  selector: 'app-contact',
  imports: [Icon, RouterLink],
  template: `
    @if (store.persona(); as p) {
      <section id="contacto" class="sheet">
        <div class="wrap">
          <header class="sheet__head">
            <p class="sheet__no"><b>06</b>Hoja</p>
            <h2 class="sheet__title">Contacto</h2>
          </header>

          <div class="contact">
            <p class="contact__call">¿Tenés un proyecto o una propuesta? <em>Hablemos.</em></p>

            <dl class="channels">
              @if (p.email) {
                <div class="channel">
                  <dt class="mono">Email</dt>
                  <dd>
                    <a [href]="'mailto:' + p.email">{{ p.email }}</a>
                    <button type="button" class="btn btn--sm" (click)="copy(p.email)">{{ copied() ? 'Copiado' : 'Copiar' }}</button>
                  </dd>
                </div>
              }
              @if (whatsapp(); as wa) {
                <div class="channel">
                  <dt class="mono">WhatsApp</dt>
                  <dd><a [href]="wa" target="_blank" rel="noopener">Escribir mensaje</a><app-icon name="external" [size]="14" /></dd>
                </div>
              }
              <div class="channel">
                <dt class="mono">LinkedIn</dt>
                <dd><a [href]="social.linkedin" target="_blank" rel="noopener">Ver perfil</a><app-icon name="external" [size]="14" /></dd>
              </div>
              <div class="channel">
                <dt class="mono">GitHub</dt>
                <dd><a [href]="social.github" target="_blank" rel="noopener">eduJSilva</a><app-icon name="external" [size]="14" /></dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <footer class="foot">
        <div class="wrap foot__grid mono">
          <span>© {{ year }} {{ p.nombre }} {{ p.apellido }}</span>
          <span>Rev. {{ revision }}</span>
          <span>Hoja 06 / 06</span>
          @if (!auth.isAdmin()) {
            <a routerLink="/login" class="foot__login" title="Acceso de administración" aria-label="Acceso de administración">
              <app-icon name="login" [size]="14" />
            </a>
          }
        </div>
      </footer>
    }
  `,
  styles: `
    .contact { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(32px, 6vw, 80px); align-items: start; }
    .contact__call { font: 400 clamp(2.4rem, 5.2vw, 4.4rem)/1 var(--serif); letter-spacing: -0.01em; }
    .contact__call em { color: var(--signal); }
    .channels { margin: 0; border-top: 1px solid var(--ink); }
    .channel {
      display: grid; grid-template-columns: 110px 1fr; gap: 16px; align-items: center; padding: 16px 0;
      border-bottom: 1px solid var(--rule);
    }
    .channel dt { color: var(--ink-3); font-size: 0.66rem; }
    .channel dd { margin: 0; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 1.02rem; word-break: break-word; }
    .channel dd a { text-decoration: none; border-bottom: 1px solid var(--ink-3); }
    .channel dd a:hover { border-color: var(--signal); color: var(--signal); }
    .foot { border-top: 1px solid var(--ink); background: var(--paper); }
    .foot__grid {
      display: grid; grid-template-columns: 1fr auto auto auto; gap: 24px; align-items: center;
      padding-block: 16px; color: var(--ink-3); font-size: 0.66rem;
    }
    .foot__login { color: var(--ink-3); display: inline-flex; }
    .foot__login:hover { color: var(--ink); }
    @media (max-width: 860px) {
      .contact { grid-template-columns: 1fr; }
      .foot__grid { grid-template-columns: 1fr auto; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly store = inject(PortfolioStore);
  protected readonly auth = inject(AuthService);
  protected readonly social = SOCIAL_LINKS;
  protected readonly year = new Date().getFullYear();
  protected readonly revision = revisionLabel();
  protected readonly copied = signal(false);

  protected readonly whatsapp = computed(() => {
    const tel = this.store.persona()?.telefono?.replace(/\D/g, '');
    if (!tel) return null;
    // Números argentinos guardados sin código de país
    return `https://wa.me/${tel.startsWith('54') ? tel : '549' + tel}`;
  });

  protected copy(email: string): void {
    navigator.clipboard?.writeText(email).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
