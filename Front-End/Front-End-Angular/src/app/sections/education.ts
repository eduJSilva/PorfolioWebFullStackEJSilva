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

type Light = 'go' | 'wait' | 'stop';

@Component({
  selector: 'app-education',
  imports: [Icon, Logo, EducacionForm],
  template: `
    <section id="formacion" class="sheet">
      <div class="wrap">
        <header class="sheet__head">
          <p class="sheet__no"><b>03</b>Hoja</p>
          <h2 class="sheet__title">Formación</h2>
          @if (auth.isAdmin()) {
            <button type="button" class="btn btn--sm" (click)="edit(null)"><app-icon name="plus" [size]="14" /> Agregar</button>
          }
        </header>

        <div class="legend mono" aria-hidden="true">
          <span><span class="signal"><i></i><i></i><i class="on go"></i></span> Completo</span>
          <span><span class="signal"><i></i><i class="on wait"></i><i></i></span> En curso</span>
          <span><span class="signal"><i class="on stop"></i><i></i><i></i></span> Incompleto</span>
        </div>

        <ul class="edu">
          @for (edu of store.educacion(); track edu.idEducacion) {
            <li class="row edu__row">
              <span class="edu__period mono">{{ period(edu) }}</span>
              <app-logo [src]="edu.imagen" [name]="edu.escuela" />
              <span class="edu__main">
                <span class="edu__title">{{ edu.titulo }}</span>
                <span class="edu__school">{{ edu.escuela }}@if (edu.carrera && edu.carrera !== edu.titulo) { · {{ edu.carrera }} }</span>
              </span>
              <span class="edu__level mono">{{ edu.nivel }}</span>
              @let l = light(edu.estado);
              <span class="edu__state" [title]="edu.estado ?? ''">
                <span class="signal" role="img" [attr.aria-label]="'Estado: ' + (edu.estado ?? 'sin dato')">
                  <i [class.on]="l === 'stop'" class="stop"></i><i [class.on]="l === 'wait'" class="wait"></i><i [class.on]="l === 'go'" class="go"></i>
                </span>
              </span>
              @if (auth.isAdmin()) {
                <span class="admin-actions admin-tools edu__admin">
                  <button type="button" class="icon-btn icon-btn--sm" (click)="edit(edu)" aria-label="Editar formación"><app-icon name="pencil" [size]="14" /></button>
                  <button type="button" class="icon-btn icon-btn--sm icon-btn--danger" (click)="remove(edu)" aria-label="Eliminar formación"><app-icon name="trash" [size]="14" /></button>
                </span>
              }
            </li>
          } @empty {
            <li class="muted">Sin formación cargada.</li>
          }
        </ul>
      </div>
    </section>

    @if (auth.isAdmin() && store.persona(); as p) {
      <app-educacion-form [open]="formOpen()" [item]="selected()" [personaId]="p.id" (closed)="formOpen.set(false)" />
    }
  `,
  styles: `
    .legend { display: flex; flex-wrap: wrap; gap: 20px; color: var(--ink-3); font-size: 0.64rem; margin-bottom: 14px; }
    .legend > span { display: inline-flex; align-items: center; gap: 8px; }
    .edu { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--ink); }
    .edu__row {
      display: grid; grid-template-columns: 180px 44px 1fr 120px 44px auto; gap: 20px; align-items: center;
      padding: 18px 0; border-bottom: 1px solid var(--rule);
    }
    .edu__period { color: var(--ink-2); font-size: 0.72rem; }
    .edu__main { display: grid; gap: 4px; min-width: 0; }
    .edu__title { font: 400 1.35rem/1.15 var(--serif); }
    .edu__school { color: var(--ink-2); font-size: 0.9rem; }
    .edu__level { color: var(--ink-3); font-size: 0.66rem; }
    .edu__state { justify-self: end; }
    .edu__state .signal { padding: 4px 6px; background: #17160f; border: 1px solid #3a3a36; border-radius: 8px; }
    .edu__state .signal i { width: 7px; height: 7px; background: #3a3a36; }
    .edu__state .signal i.on.go { background: #4fc27b; box-shadow: 0 0 5px #4fc27b; }
    .edu__state .signal i.on.wait { background: #ffb547; box-shadow: 0 0 5px #ffb547; }
    .edu__state .signal i.on.stop { background: #e5533b; box-shadow: 0 0 5px #e5533b; }
    @media (max-width: 860px) {
      .edu__row { grid-template-columns: 44px 1fr auto; row-gap: 8px; }
      .edu__period { grid-column: 1 / -1; order: -1; }
      .edu__level { display: none; }
    }
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

  protected light(estado?: string | null): Light {
    if (estado === 'Graduado') return 'go';
    if (estado === 'En curso') return 'wait';
    return 'stop';
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
