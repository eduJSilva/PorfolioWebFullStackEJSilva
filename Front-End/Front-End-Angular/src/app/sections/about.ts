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
      <section id="perfil" class="sheet">
        <div class="wrap">
          <header class="sheet__head">
            <p class="sheet__no"><b>01</b>Hoja</p>
            <h2 class="sheet__title">Perfil</h2>
            @if (auth.isAdmin()) {
              <button type="button" class="btn btn--sm" (click)="openEditor()"><app-icon name="pencil" [size]="14" /> Editar</button>
            }
          </header>

          <div class="about">
            <div class="about__text">
              @for (paragraph of paragraphs(); track $index; let first = $first) {
                <p [class.about__lead]="first && paragraph.length <= 360">{{ paragraph }}</p>
              } @empty {
                <p class="muted">Todavía no hay una descripción cargada.</p>
              }
            </div>

            <aside class="about__side">
              <dl class="readings">
                @for (r of readings(); track r.label) {
                  <div class="reading">
                    <dt class="mono">{{ r.label }}</dt>
                    <dd>{{ r.value }}</dd>
                    <span class="reading__ticks" aria-hidden="true"></span>
                  </div>
                }
              </dl>

              @if (instituciones().length) {
                <div class="refs">
                  <p class="mono refs__title">Referencias</p>
                  <ul>
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
        <app-modal title="Editar perfil" [open]="editing()" (closed)="editing.set(false)">
          <div class="form">
            <div class="field">
              <label for="acerca">Descripción</label>
              <textarea id="acerca" class="textarea" rows="12" [formControl]="text"></textarea>
              <span class="hint">Separá los párrafos con una línea en blanco. El primero se destaca.</span>
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
    .about { display: grid; grid-template-columns: 1.6fr 1fr; gap: clamp(32px, 6vw, 88px); align-items: start; }
    .about__text { display: grid; gap: 18px; font-size: 1.04rem; color: var(--ink-2); max-width: 64ch; }
    .about__lead {
      font-family: var(--serif); font-size: clamp(1.6rem, 2.8vw, 2.2rem); line-height: 1.22; color: var(--ink);
      margin-bottom: 10px;
    }
    .readings { margin: 0; display: grid; gap: 0; border-top: 1px solid var(--ink); }
    .reading {
      display: grid; grid-template-columns: 1fr auto; align-items: baseline; gap: 12px; padding: 14px 0 10px;
      border-bottom: 1px solid var(--rule); position: relative;
    }
    .reading dt { color: var(--ink-2); font-size: 0.68rem; }
    .reading dd { margin: 0; font: 400 2.6rem/1 var(--serif); }
    .reading__ticks {
      position: absolute; left: 0; right: 0; bottom: -1px; height: 6px;
      background: repeating-linear-gradient(90deg, var(--ink-3) 0 1px, transparent 1px 12px);
      opacity: 0.5;
    }
    .refs { margin-top: 36px; }
    .refs__title { color: var(--ink-3); margin-bottom: 12px; font-size: 0.66rem; }
    .refs ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
    .refs li { display: flex; align-items: center; gap: 12px; }
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

  protected readonly readings = computed(() => {
    const exps = this.store.experiencias();
    const firstYear = Math.min(...exps.map((e) => yearOf(e.inicio)).filter((y) => y > 0 && y < 9999));
    const years = Number.isFinite(firstYear) ? new Date().getFullYear() - firstYear : 0;
    return [
      { value: years ? `${years}+` : '—', label: 'Años de trayectoria' },
      { value: String(this.store.proyectos().length).padStart(2, '0'), label: 'Proyectos' },
      { value: String(this.store.skills().length).padStart(2, '0'), label: 'Ítems de stack' },
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
      'Perfil actualizado.',
      () => this.editing.set(false),
    );
  }
}
