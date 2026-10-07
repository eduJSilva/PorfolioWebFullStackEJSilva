import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { SOCIAL_LINKS } from '../core/links';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { PersonaForm } from '../admin/persona-form';
import { Icon } from '../shared/icon';
import { ImageUpload } from '../shared/image-upload';

@Component({
  selector: 'app-hero',
  imports: [Icon, ImageUpload, PersonaForm],
  template: `
    @if (store.persona(); as p) {
      <section id="inicio" class="hero">
        @if (store.portada(); as portada) {
          <div class="hero__cover" [style.background-image]="'url(' + portada + ')'" aria-hidden="true"></div>
        }
        <div class="container hero__inner">
          <div class="hero__text reveal">
            <span class="badge badge--primary hero__status"><span class="dot"></span> Bienvenido/a a mi portfolio</span>
            <h1 class="hero__title">
              Hola, soy <span class="gradient-text">{{ p.nombre }} {{ p.apellido }}</span>
            </h1>
            <p class="hero__role">{{ p.puesto }}</p>
            @if (location()) {
              <p class="hero__meta muted"><app-icon name="pin" [size]="16" /> {{ location() }}</p>
            }
            <div class="hero__cta">
              <a href="#proyectos" class="btn btn--primary">Ver proyectos <app-icon name="arrowDown" [size]="18" /></a>
              <a href="#contacto" class="btn btn--ghost">Contactame</a>
            </div>
            <div class="hero__social">
              <a class="icon-btn" [href]="social.github" target="_blank" rel="noopener" aria-label="GitHub"><app-icon name="github" [size]="18" /></a>
              <a class="icon-btn" [href]="social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" [size]="18" /></a>
              @if (p.email) {
                <a class="icon-btn" [href]="'mailto:' + p.email" aria-label="Email"><app-icon name="mail" [size]="18" /></a>
              }
            </div>
            @if (auth.isAdmin()) {
              <div class="admin-actions" style="margin-top: 24px">
                <button type="button" class="btn btn--ghost btn--sm" (click)="editing.set('datos')"><app-icon name="pencil" [size]="16" /> Datos personales</button>
                <button type="button" class="btn btn--ghost btn--sm" (click)="editing.set('foto')"><app-icon name="camera" [size]="16" /> Foto</button>
                <button type="button" class="btn btn--ghost btn--sm" (click)="editing.set('portada')"><app-icon name="image" [size]="16" /> Portada</button>
              </div>
            }
          </div>
          <div class="hero__photo reveal">
            <div class="hero__ring">
              <img [src]="photoFailed() ? fallbackPhoto : store.foto()" [alt]="'Foto de ' + p.nombre + ' ' + p.apellido"
                width="320" height="320" (error)="photoFailed.set(true)" />
            </div>
          </div>
        </div>
      </section>

      @if (auth.isAdmin()) {
        <app-persona-form [open]="editing() === 'datos'" [persona]="p" (closed)="editing.set(null)" />
        <app-image-upload title="Cambiar foto de perfil" [open]="editing() === 'foto'" [current]="store.foto()"
          [busy]="uploading()" (save)="upload(api.uploadFoto($event), 'Foto actualizada.')" (closed)="editing.set(null)" />
        <app-image-upload title="Cambiar imagen de portada" [open]="editing() === 'portada'" [current]="store.portada()"
          [busy]="uploading()" (save)="upload(api.uploadPortada($event), 'Portada actualizada.')" (closed)="editing.set(null)" />
      }
    } @else if (store.loading()) {
      <section class="hero">
        <div class="container hero__inner">
          <div class="hero__text">
            <div class="skeleton" style="height: 28px; width: 220px; margin-bottom: 20px"></div>
            <div class="skeleton" style="height: 64px; width: 90%; margin-bottom: 16px"></div>
            <div class="skeleton" style="height: 28px; width: 60%"></div>
          </div>
          <div class="hero__photo"><div class="skeleton hero__ring" style="border-radius: 50%"></div></div>
        </div>
      </section>
    }
  `,
  styles: `
    .hero { position: relative; overflow: hidden; padding-block: 72px 96px; }
    .hero::before, .hero::after {
      content: ''; position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.35; z-index: -1;
    }
    .hero::before { width: 480px; height: 480px; background: var(--primary); top: -160px; left: -120px; }
    .hero::after { width: 420px; height: 420px; background: var(--accent); bottom: -180px; right: -80px; }
    .hero__cover {
      position: absolute; inset: 0; z-index: -2; background-size: cover; background-position: center; opacity: 0.08;
      mask-image: linear-gradient(to bottom, black, transparent);
    }
    .hero__inner { display: grid; grid-template-columns: 1.3fr 1fr; align-items: center; gap: 48px; }
    .hero__status { margin-bottom: 20px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; box-shadow: 0 0 0 4px color-mix(in srgb, currentColor 25%, transparent); }
    .hero__title { font-size: clamp(2.3rem, 4.5vw + 1rem, 4rem); font-weight: 700; }
    .gradient-text { background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .hero__role { margin-top: 14px; font-size: clamp(1.15rem, 1vw + 1rem, 1.45rem); font-weight: 500; }
    .hero__meta { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
    .hero__cta { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
    .hero__social { display: flex; gap: 10px; margin-top: 28px; }
    .hero__photo { display: grid; place-items: center; }
    .hero__ring {
      width: min(340px, 75vw); aspect-ratio: 1; border-radius: 50%; padding: 6px; background: var(--gradient);
      box-shadow: var(--shadow-lg);
    }
    .hero__ring img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; border: 6px solid var(--bg); }
    @media (max-width: 860px) {
      .hero { padding-block: 40px 72px; }
      .hero__inner { grid-template-columns: 1fr; text-align: center; }
      .hero__photo { order: -1; }
      .hero__ring { width: min(220px, 60vw); }
      .hero__meta, .hero__cta, .hero__social, .admin-actions { justify-content: center; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly store = inject(PortfolioStore);
  protected readonly auth = inject(AuthService);
  protected readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  protected readonly social = SOCIAL_LINKS;
  protected readonly editing = signal<'datos' | 'foto' | 'portada' | null>(null);
  protected readonly uploading = signal(false);
  protected readonly photoFailed = signal(false);
  protected readonly fallbackPhoto = 'assets/foto_de_perfil/Foto_2021.png';

  protected readonly location = computed(() => {
    const p = this.store.persona();
    return [p?.ciudad, p?.provincia].filter(Boolean).join(', ');
  });

  protected upload(request: Observable<string>, message: string): void {
    this.uploading.set(true);
    request.subscribe({
      next: () => {
        this.uploading.set(false);
        this.editing.set(null);
        this.toast.success(message);
        this.photoFailed.set(false);
        this.store.load();
      },
      error: () => {
        this.uploading.set(false);
        this.toast.error('No se pudo subir la imagen.');
      },
    });
  }
}
