import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { SOCIAL_LINKS } from '../core/links';
import { PortfolioStore } from '../core/portfolio.store';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-contact',
  imports: [Icon, RouterLink],
  template: `
    @if (store.persona(); as p) {
      <section id="contacto" class="section">
        <div class="container">
          <div class="contact">
            <p class="eyebrow" style="justify-content: center"><app-icon name="mail" [size]="16" /> Contacto</p>
            <h2 class="section__title">¿Trabajamos juntos?</h2>
            <p class="muted contact__lead">
              Si te interesa mi perfil o tenés un proyecto en mente, escribime y te respondo a la brevedad.
            </p>
            <div class="contact__actions">
              @if (p.email) {
                <a class="btn btn--primary" [href]="'mailto:' + p.email"><app-icon name="mail" [size]="18" /> {{ p.email }}</a>
              }
              @if (whatsapp(); as wa) {
                <a class="btn btn--ghost" [href]="wa" target="_blank" rel="noopener"><app-icon name="whatsapp" [size]="18" /> WhatsApp</a>
              }
              <a class="btn btn--ghost" [href]="social.linkedin" target="_blank" rel="noopener"><app-icon name="linkedin" [size]="18" /> LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="container footer__inner">
          <p class="muted">© {{ year }} {{ p.nombre }} {{ p.apellido }} · Hecho con Angular + Spring Boot</p>
          <div class="footer__links">
            <a class="icon-btn" [href]="social.github" target="_blank" rel="noopener" aria-label="GitHub"><app-icon name="github" [size]="18" /></a>
            <a class="icon-btn" [href]="social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" [size]="18" /></a>
            <a class="icon-btn" [href]="social.x" target="_blank" rel="noopener" aria-label="X (Twitter)"><app-icon name="x" [size]="18" /></a>
            @if (!auth.isAdmin()) {
              <a class="icon-btn" routerLink="/login" aria-label="Acceso administrador" title="Acceso administrador"><app-icon name="login" [size]="18" /></a>
            }
          </div>
        </div>
      </footer>
    }
  `,
  styles: `
    .contact {
      max-width: 720px; margin-inline: auto; text-align: center; padding: 56px 28px; border-radius: var(--radius-lg);
      background:
        radial-gradient(400px 200px at 0% 0%, color-mix(in srgb, var(--primary) 16%, transparent), transparent),
        radial-gradient(400px 200px at 100% 100%, color-mix(in srgb, var(--accent) 16%, transparent), transparent),
        var(--bg-elevated);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
    }
    .contact__lead { margin: 12px auto 28px; max-width: 520px; font-size: 1.05rem; }
    .contact__actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .footer { border-top: 1px solid var(--border); padding-block: 28px; }
    .footer__inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .footer__inner p { font-size: 0.9rem; }
    .footer__links { display: flex; gap: 8px; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly store = inject(PortfolioStore);
  protected readonly auth = inject(AuthService);
  protected readonly social = SOCIAL_LINKS;
  protected readonly year = new Date().getFullYear();

  protected readonly whatsapp = computed(() => {
    const tel = this.store.persona()?.telefono?.replace(/\D/g, '');
    if (!tel) return null;
    // Números argentinos guardados sin código de país
    return `https://wa.me/${tel.startsWith('54') ? tel : '549' + tel}`;
  });
}
