import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { Experiencia } from '../core/models';
import { PortfolioStore, formatPeriod } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { ExperienciaForm } from '../admin/experiencia-form';
import { ConfirmService } from '../shared/confirm';
import { Icon } from '../shared/icon';
import { Logo } from '../shared/logo';
import { toBullets } from '../shared/text';

@Component({
  selector: 'app-experience',
  imports: [Icon, Logo, ExperienciaForm],
  template: `
    <section id="experiencia" class="section">
      <div class="container">
        <div class="section__head">
          <div>
            <p class="eyebrow"><app-icon name="briefcase" [size]="16" /> Experiencia</p>
            <h2 class="section__title">Trayectoria profesional</h2>
          </div>
          @if (auth.isAdmin()) {
            <button type="button" class="btn btn--primary btn--sm" (click)="edit(null)"><app-icon name="plus" [size]="16" /> Agregar</button>
          }
        </div>

        <ol class="timeline">
          @for (exp of store.experiencias(); track exp.idExperiencia) {
            <li class="timeline__item">
              <span class="timeline__dot" aria-hidden="true"></span>
              <article class="card card--hover">
                <header class="exp__head">
                  <app-logo [src]="exp.imagen" [name]="exp.empresa" />
                  <div>
                    <h3 class="exp__title">{{ exp.puesto }}</h3>
                    <p class="exp__company">{{ exp.empresa }}</p>
                    <p class="exp__period muted">{{ period(exp) }}</p>
                  </div>
                </header>
                @let bullets = toBullets(exp.descripcion);
                @if (bullets.length > 1) {
                  <ul class="exp__list">
                    @for (b of bullets; track $index) { <li>{{ b }}</li> }
                  </ul>
                } @else if (bullets.length === 1) {
                  <p class="exp__desc muted">{{ bullets[0] }}</p>
                }
                @if (auth.isAdmin()) {
                  <div class="admin-actions admin-actions--floating">
                    <button type="button" class="icon-btn" (click)="edit(exp)" aria-label="Editar experiencia"><app-icon name="pencil" [size]="16" /></button>
                    <button type="button" class="icon-btn icon-btn--danger" (click)="remove(exp)" aria-label="Eliminar experiencia"><app-icon name="trash" [size]="16" /></button>
                  </div>
                }
              </article>
            </li>
          } @empty {
            <p class="muted">Sin experiencias cargadas.</p>
          }
        </ol>
      </div>
    </section>

    @if (auth.isAdmin() && store.persona(); as p) {
      <app-experiencia-form [open]="formOpen()" [item]="selected()" [personaId]="p.id" (closed)="formOpen.set(false)" />
    }
  `,
  styles: `
    .timeline { list-style: none; margin: 0; padding: 0 0 0 28px; position: relative; display: grid; gap: 20px; }
    .timeline::before { content: ''; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(var(--primary), var(--accent)); opacity: 0.4; }
    .timeline__item { position: relative; }
    .timeline__dot { position: absolute; left: -28px; top: 30px; width: 16px; height: 16px; border-radius: 50%; background: var(--bg); border: 3px solid var(--primary); }
    .exp__head { display: flex; gap: 16px; align-items: flex-start; padding-right: 80px; }
    .exp__title { font-size: 1.15rem; }
    .exp__company { font-weight: 600; color: var(--primary); }
    .exp__period { font-size: 0.88rem; }
    .exp__list { margin: 16px 0 0; padding-left: 20px; display: grid; gap: 6px; color: var(--text-muted); columns: 2; column-gap: 32px; }
    .exp__list li { break-inside: avoid; }
    .exp__desc { margin-top: 14px; }
    @media (max-width: 700px) { .exp__list { columns: 1; } .exp__head { padding-right: 0; } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly store = inject(PortfolioStore);
  protected readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly formOpen = signal(false);
  protected readonly selected = signal<Experiencia | null>(null);
  protected readonly toBullets = toBullets;

  protected period(e: Experiencia): string {
    return formatPeriod(e.inicio, e.fin);
  }

  protected edit(item: Experiencia | null): void {
    this.selected.set(item);
    this.formOpen.set(true);
  }

  protected async remove(item: Experiencia): Promise<void> {
    if (!item.idExperiencia) return;
    const ok = await this.confirm.ask(`Se eliminará “${item.puesto}” en ${item.empresa}.`);
    if (!ok) return;
    this.api.deleteExperiencia(item.idExperiencia).subscribe({
      next: () => {
        this.toast.success('Experiencia eliminada.');
        this.store.load();
      },
      error: () => this.toast.error('No se pudo eliminar la experiencia.'),
    });
  }
}
