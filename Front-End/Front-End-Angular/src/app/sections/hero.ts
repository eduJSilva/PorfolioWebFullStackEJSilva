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
import { revisionLabel } from './navbar';

@Component({
  selector: 'app-hero',
  imports: [Icon, ImageUpload, PersonaForm],
  template: `
    @if (store.persona(); as p) {
      <section id="inicio" class="hero">
        <div class="wrap hero__grid">
          <div class="hero__main reveal">
            <p class="mono hero__kicker">
              <span class="signal"><i class="on stop"></i><i class="on wait"></i><i class="on go"></i></span>
              Portfolio personal
            </p>
            <h1 class="hero__name">
              <span>{{ firstName() }}</span>
              <span class="hero__name-2"><em>{{ middleName() }}</em> {{ p.apellido }}</span>
            </h1>
            <p class="hero__role">{{ p.puesto }}</p>
            <div class="hero__links">
              <a href="#proyectos" class="arrow-link">Ver proyectos <app-icon name="arrowDown" [size]="14" /></a>
              <a href="#contacto" class="arrow-link">Contacto <app-icon name="arrowDown" [size]="14" /></a>
              <a [href]="social.github" target="_blank" rel="noopener" class="arrow-link">GitHub <app-icon name="external" [size]="14" /></a>
              <a [href]="social.linkedin" target="_blank" rel="noopener" class="arrow-link">LinkedIn <app-icon name="external" [size]="14" /></a>
            </div>
            @if (auth.isAdmin()) {
              <div class="admin-actions hero__admin">
                <button type="button" class="btn btn--sm" (click)="editing.set('datos')"><app-icon name="pencil" [size]="14" /> Datos</button>
                <button type="button" class="btn btn--sm" (click)="editing.set('foto')"><app-icon name="camera" [size]="14" /> Foto</button>
                <button type="button" class="btn btn--sm" (click)="editing.set('portada')"><app-icon name="image" [size]="14" /> Portada</button>
              </div>
            }
          </div>

          <aside class="hero__side reveal">
            <figure class="frame">
              <img [src]="photoFailed() ? fallbackPhoto : store.foto()" [alt]="'Foto de ' + p.nombre + ' ' + p.apellido"
                width="360" height="420" (error)="photoFailed.set(true)" />
              <span class="frame__mark frame__mark--tl"></span>
              <span class="frame__mark frame__mark--tr"></span>
              <span class="frame__mark frame__mark--bl"></span>
              <span class="frame__mark frame__mark--br"></span>
            </figure>
            <table class="title-block">
              <tbody>
                <tr><th>Autor</th><td colspan="3">{{ p.nombre }} {{ p.apellido }}</td></tr>
                <tr><th>Especialidad</th><td colspan="3">{{ p.puesto }}</td></tr>
                @if (location()) {
                  <tr><th>Ubicación</th><td colspan="3">{{ location() }}</td></tr>
                }
                @if (stack()) {
                  <tr><th>Stack</th><td colspan="3">{{ stack() }}</td></tr>
                }
                <tr><th>Rev.</th><td>{{ revision }}</td><th>Hoja</th><td>01 / 06</td></tr>
              </tbody>
            </table>
          </aside>
        </div>
        @if (store.portada(); as portada) {
          @if (!coverFailed()) {
            <img class="hero__strip" [src]="portada" alt="" aria-hidden="true" loading="lazy" (error)="coverFailed.set(true)" />
          }
        }
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
        <div class="wrap hero__grid" aria-busy="true">
          <div>
            <div class="skeleton" style="height: 14px; width: 180px; margin-bottom: 28px"></div>
            <div class="skeleton" style="height: 120px; width: 90%; margin-bottom: 20px"></div>
            <div class="skeleton" style="height: 28px; width: 50%"></div>
          </div>
          <div class="skeleton" style="aspect-ratio: 6 / 7"></div>
        </div>
      </section>
    }
  `,
  styles: `
    .hero { padding-block: clamp(48px, 8vw, 104px) clamp(56px, 8vw, 96px); }
    .hero__grid { display: grid; grid-template-columns: 1.45fr 1fr; gap: clamp(32px, 6vw, 80px); align-items: end; }
    .hero__kicker { display: flex; align-items: center; gap: 12px; color: var(--ink-2); margin-bottom: clamp(20px, 3vw, 36px); }
    .hero__name {
      font-family: var(--serif); font-size: clamp(3.6rem, 10.5vw, 8.8rem); line-height: 0.88; letter-spacing: -0.025em;
      display: grid;
    }
    .hero__name-2 { padding-left: clamp(0px, 6vw, 88px); }
    .hero__name em { color: var(--signal); }
    .hero__role {
      margin-top: clamp(20px, 3vw, 32px); max-width: 30ch; font-family: var(--serif); font-style: italic;
      font-size: clamp(1.4rem, 2.6vw, 2rem); line-height: 1.2; color: var(--ink-2);
    }
    .hero__links { display: flex; flex-wrap: wrap; gap: 14px 24px; margin-top: clamp(28px, 4vw, 44px); }
    .hero__admin { margin-top: 28px; }
    .frame { position: relative; margin: 0 0 18px; padding: 10px; }
    .frame img {
      width: 100%; aspect-ratio: 6 / 7; object-fit: cover; filter: grayscale(1) contrast(1.05);
      transition: filter 0.6s var(--ease);
    }
    .frame:hover img { filter: none; }
    .frame__mark { position: absolute; width: 18px; height: 18px; border-color: var(--ink); border-style: solid; }
    .frame__mark--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
    .frame__mark--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
    .frame__mark--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
    .frame__mark--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
    .title-block { width: 100%; border-collapse: collapse; background: var(--sheet); font-size: 0.86rem; }
    .title-block th, .title-block td { border: 1px solid var(--ink); padding: 6px 10px; text-align: left; vertical-align: top; }
    .title-block th {
      width: 1%; white-space: nowrap; font: 500 0.62rem var(--mono); letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--ink-2); background: var(--paper-2);
    }
    .hero__strip {
      display: block; width: 100%; height: clamp(90px, 14vw, 160px); margin-top: clamp(48px, 7vw, 88px); object-fit: cover;
      filter: grayscale(1) contrast(1.1); opacity: 0.85; border-block: 1px solid var(--ink);
    }
    @media (max-width: 860px) {
      .hero__grid { grid-template-columns: 1fr; }
      .hero__side { max-width: 420px; }
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
  protected readonly revision = revisionLabel();
  protected readonly editing = signal<'datos' | 'foto' | 'portada' | null>(null);
  protected readonly uploading = signal(false);
  protected readonly photoFailed = signal(false);
  protected readonly coverFailed = signal(false);
  protected readonly fallbackPhoto = 'assets/foto_de_perfil/Foto_2021.png';

  private readonly names = computed(() => (this.store.persona()?.nombre ?? '').split(/\s+/).filter(Boolean));
  protected readonly firstName = computed(() => this.names()[0] ?? '');
  protected readonly middleName = computed(() => this.names().slice(1).join(' '));

  protected readonly location = computed(() => {
    const p = this.store.persona();
    return [p?.ciudad, p?.provincia].filter(Boolean).join(', ');
  });

  /** Las tres habilidades técnicas con mayor dominio. */
  protected readonly stack = computed(() =>
    this.store
      .skills()
      .filter((s) => s.tipoSkill !== 'soft')
      .slice(0, 3)
      .map((s) => s.nombreSkill)
      .join(' · '),
  );

  protected upload(request: Observable<string>, message: string): void {
    this.uploading.set(true);
    request.subscribe({
      next: () => {
        this.uploading.set(false);
        this.editing.set(null);
        this.photoFailed.set(false);
        this.coverFailed.set(false);
        this.toast.success(message);
        this.store.load();
      },
      error: () => {
        this.uploading.set(false);
        this.toast.error('No se pudo subir la imagen.');
      },
    });
  }
}
