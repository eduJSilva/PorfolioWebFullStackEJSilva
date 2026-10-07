import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { Educacion } from '../core/models';
import { PortfolioStore, formatPeriod } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { EducacionForm } from '../admin/educacion-form';
import { ConfirmService } from '../shared/confirm';
import { Icon } from '../shared/icon';
import { Logo } from '../shared/logo';

@Component({
  selector: 'app-education',
  imports: [Icon, Logo, EducacionForm],
  template: `
    <section id="educacion" class="section section--alt">
      <div class="container">
        <div class="section__head">
          <div>
            <p class="eyebrow"><app-icon name="graduation" [size]="16" /> Educación</p>
            <h2 class="section__title">Formación</h2>
          </div>
          @if (auth.isAdmin()) {
            <button type="button" class="btn btn--primary btn--sm" (click)="edit(null)"><app-icon name="plus" [size]="16" /> Agregar</button>
          }
        </div>

        <div class="grid grid--2">
          @for (edu of store.educacion(); track edu.idEducacion) {
            <article class="card card--hover edu">
              <app-logo [src]="edu.imagen" [name]="edu.escuela" />
              <div class="edu__body">
                <div class="edu__badges">
                  @if (edu.nivel) { <span class="badge">{{ edu.nivel }}</span> }
                  @if (edu.estado) { <span class="badge" [class]="'badge ' + estadoClass(edu.estado)">{{ edu.estado }}</span> }
                </div>
                <h3 class="edu__title">{{ edu.titulo }}</h3>
                <p class="edu__school">{{ edu.escuela }}</p>
                @if (edu.carrera && edu.carrera !== edu.titulo) {
                  <p class="muted edu__career">{{ edu.carrera }}</p>
                }
                <p class="muted edu__period">{{ period(edu) }}</p>
              </div>
              @if (auth.isAdmin()) {
                <div class="admin-actions admin-actions--floating">
                  <button type="button" class="icon-btn" (click)="edit(edu)" aria-label="Editar formación"><app-icon name="pencil" [size]="16" /></button>
                  <button type="button" class="icon-btn icon-btn--danger" (click)="remove(edu)" aria-label="Eliminar formación"><app-icon name="trash" [size]="16" /></button>
                </div>
              }
            </article>
          } @empty {
            <p class="muted">Sin formación cargada.</p>
          }
        </div>
      </div>
    </section>

    @if (auth.isAdmin() && store.persona(); as p) {
      <app-educacion-form [open]="formOpen()" [item]="selected()" [personaId]="p.id" (closed)="formOpen.set(false)" />
    }
  `,
  styles: `
    .edu { display: flex; gap: 16px; align-items: flex-start; }
    .edu__body { display: grid; gap: 4px; min-width: 0; }
    .edu__badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 6px; padding-right: 80px; }
    .edu__title { font-size: 1.08rem; }
    .edu__school { font-weight: 600; color: var(--primary); }
    .edu__career, .edu__period { font-size: 0.88rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {
  protected readonly store = inject(PortfolioStore);
  protected readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly formOpen = signal(false);
  protected readonly selected = signal<Educacion | null>(null);

  protected period(e: Educacion): string {
    return formatPeriod(e.inicio, e.fin);
  }

  protected estadoClass(estado: string): string {
    if (estado === 'Graduado') return 'badge--success';
    if (estado === 'En curso') return 'badge--primary';
    return 'badge--warning';
  }

  protected edit(item: Educacion | null): void {
    this.selected.set(item);
    this.formOpen.set(true);
  }

  protected async remove(item: Educacion): Promise<void> {
    if (!item.idEducacion) return;
    if (!(await this.confirm.ask(`Se eliminará “${item.titulo}”.`))) return;
    this.api.deleteEducacion(item.idEducacion).subscribe({
      next: () => {
        this.toast.success('Formación eliminada.');
        this.store.load();
      },
      error: () => this.toast.error('No se pudo eliminar la formación.'),
    });
  }
}
