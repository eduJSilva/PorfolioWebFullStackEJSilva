import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { PortfolioStore, yearOf } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { runSave } from '../admin/save';
import { Icon } from '../shared/icon';
import { Logo } from '../shared/logo';
import { Modal } from '../shared/modal';
import { safeUrl, toParagraphs } from '../shared/text';

@Component({
  selector: 'app-about',
  imports: [Icon, Logo, Modal, ReactiveFormsModule],
  template: `
    @if (store.persona(); as p) {
      <section id="sobre-mi" class="section section--alt">
        <div class="container">
          <div class="section__head">
            <div>
              <p class="eyebrow"><app-icon name="sparkles" [size]="16" /> Sobre mí</p>
              <h2 class="section__title">Un poco de mi historia</h2>
            </div>
            @if (auth.isAdmin()) {
              <button type="button" class="btn btn--ghost btn--sm" (click)="openEditor()"><app-icon name="pencil" [size]="16" /> Editar</button>
            }
          </div>

          <div class="about">
            <div class="about__text">
              @for (paragraph of paragraphs(); track $index) {
                <p>{{ paragraph }}</p>
              } @empty {
                <p class="muted">Todavía no hay una descripción cargada.</p>
              }
            </div>
            <aside class="about__aside">
              <div class="stats">
                @for (stat of stats(); track stat.label) {
                  <div class="stat card">
                    <strong>{{ stat.value }}</strong>
                    <span class="muted">{{ stat.label }}</span>
                  </div>
                }
              </div>
              @if (instituciones().length) {
                <div class="card">
                  <h3 class="about__subtitle">Instituciones</h3>
                  <ul class="inst">
                    @for (inst of instituciones(); track inst.nombre) {
                      <li>
                        <app-logo [src]="inst.logo" [name]="inst.nombre" />
                        @if (inst.link) {
                          <a [href]="inst.link" target="_blank" rel="noopener">{{ inst.nombre }}</a>
                        } @else {
                          <span>{{ inst.nombre }}</span>
                        }
                      </li>
                    }
                  </ul>
                </div>
              }
            </aside>
          </div>
        </div>
      </section>

      @if (auth.isAdmin()) {
        <app-modal title="Editar “Sobre mí”" [open]="editing()" (closed)="editing.set(false)">
          <div class="form">
            <div class="field">
              <label for="acerca">Descripción</label>
              <textarea id="acerca" class="textarea" rows="10" [formControl]="text"></textarea>
              <span class="hint">Separá los párrafos con una línea en blanco.</span>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn--ghost" (click)="editing.set(false)">Cancelar</button>
              <button type="button" class="btn btn--primary" [disabled]="busy()" (click)="save(p.id)">{{ busy() ? 'Guardando…' : 'Guardar' }}</button>
            </div>
          </div>
        </app-modal>
      }
    }
  `,
  styles: `
    .about { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; align-items: start; }
    .about__text { display: grid; gap: 16px; font-size: 1.05rem; color: var(--text-muted); }
    .about__text p:first-child { color: var(--text); font-size: 1.15rem; }
    .about__aside { display: grid; gap: 20px; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .stat { padding: 18px 12px; text-align: center; display: grid; gap: 2px; }
    .stat strong { font-family: var(--font-display); font-size: 1.8rem; background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .stat span { font-size: 0.8rem; }
    .about__subtitle { font-size: 1rem; margin-bottom: 14px; }
    .inst { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
    .inst li { display: flex; align-items: center; gap: 12px; font-weight: 500; }
    @media (max-width: 860px) { .about { grid-template-columns: 1fr; } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly store = inject(PortfolioStore);
  protected readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  protected readonly editing = signal(false);
  protected readonly busy = signal(false);
  protected readonly text = new FormControl('', { nonNullable: true });

  protected readonly paragraphs = computed(() => toParagraphs(this.store.persona()?.acercaDe));

  protected readonly stats = computed(() => {
    const exps = this.store.experiencias();
    const firstYear = Math.min(...exps.map((e) => yearOf(e.inicio)).filter((y) => y > 0 && y < 9999));
    const years = Number.isFinite(firstYear) ? new Date().getFullYear() - firstYear : 0;
    return [
      { value: years ? `${years}+` : '—', label: 'años de experiencia' },
      { value: String(this.store.proyectos().length), label: 'proyectos' },
      { value: String(this.store.skills().length), label: 'skills' },
    ];
  });

  protected readonly instituciones = computed(() => {
    const p = this.store.persona();
    if (!p) return [];
    return [
      { nombre: p.institucionUno, logo: p.logoInstitucionUno, link: safeUrl(p.linkInstitucionUno) },
      { nombre: p.institucionDos, logo: p.logoInstitucionDos, link: safeUrl(p.linkInstitucionDos) },
    ].filter((i): i is { nombre: string; logo: string | null | undefined; link: string | null } => !!i.nombre);
  });

  protected openEditor(): void {
    this.text.setValue(this.store.persona()?.acercaDe ?? '');
    this.editing.set(true);
  }

  protected save(personaId: number): void {
    runSave(
      this.api.updateAcercaDe(personaId, this.text.value.trim()),
      { busy: this.busy, store: this.store, toast: this.toast },
      'Descripción actualizada.',
      () => this.editing.set(false),
    );
  }
}
