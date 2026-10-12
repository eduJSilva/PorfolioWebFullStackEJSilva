import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { Proyecto } from '../core/models';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { ProyectoForm } from '../admin/proyecto-form';
import { ConfirmService } from '../shared/confirm';
import { Icon } from '../shared/icon';
import { safeUrl } from '../shared/text';

@Component({
  selector: 'app-projects',
  imports: [Icon, ProyectoForm],
  template: `
    <section id="proyectos" class="sheet">
      <div class="wrap">
        <header class="sheet__head">
          <p class="sheet__no"><b>05</b>Hoja</p>
          <h2 class="sheet__title">Proyectos</h2>
          @if (auth.isAdmin()) {
            <button type="button" class="btn btn--sm" (click)="edit(null)"><app-icon name="plus" [size]="14" /> Agregar</button>
          }
        </header>

        <div class="plates">
          @for (p of store.proyectos(); track p.idProyecto; let i = $index) {
            <article class="card plate" [class.plate--wide]="i === 0">
              <header class="plate__bar mono">
                <span>P-{{ (i + 1).toString().padStart(2, '0') }}</span>
                <span>{{ p.fecha }}</span>
              </header>
              <div class="plate__media">
                @if (imageOf(p); as img) {
                  <img [src]="img" [alt]="'Captura de ' + p.nombreProyecto" loading="lazy" (error)="markBroken(p)" />
                } @else {
                  <div class="plate__blank" aria-hidden="true">
                    <span class="mono">{{ initials(p.nombreProyecto) }}</span>
                  </div>
                }
                @if (isUpcoming(p)) {
                  <span class="stamp mono">Próximamente</span>
                }
              </div>
              <div class="plate__body">
                <h3 class="plate__title">{{ p.nombreProyecto }}</h3>
                @if (p.descripcion) { <p class="plate__desc">{{ p.descripcion }}</p> }
                <div class="plate__foot">
                  @if (link(p); as href) {
                    <a class="arrow-link" [href]="href" target="_blank" rel="noopener">Ver proyecto <app-icon name="external" [size]="14" /></a>
                  }
                  @if (auth.isAdmin()) {
                    <span class="admin-actions admin-tools">
                      <button type="button" class="icon-btn icon-btn--sm" (click)="edit(p)" aria-label="Editar proyecto"><app-icon name="pencil" [size]="14" /></button>
                      <button type="button" class="icon-btn icon-btn--sm icon-btn--danger" (click)="remove(p)" aria-label="Eliminar proyecto"><app-icon name="trash" [size]="14" /></button>
                    </span>
                  }
                </div>
              </div>
            </article>
          } @empty {
            <p class="muted">Sin proyectos cargados.</p>
          }
        </div>
      </div>
    </section>

    @if (auth.isAdmin() && store.persona(); as p) {
      <app-proyecto-form [open]="formOpen()" [item]="selected()" [personaId]="p.id" (closed)="formOpen.set(false)" />
    }
  `,
  styles: `
    .plates { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(20px, 3vw, 36px); }
    .plate { display: flex; flex-direction: column; background: var(--sheet); border: 1px solid var(--ink); }
    .plate--wide { grid-column: 1 / -1; display: grid; grid-template-columns: 1.2fr 1fr; grid-template-rows: auto 1fr; }
    .plate--wide .plate__bar { grid-column: 1 / -1; }
    .plate--wide .plate__media { aspect-ratio: auto; min-height: 280px; border-bottom: none; border-right: 1px solid var(--ink); }
    .plate--wide .plate__title { font-size: clamp(2rem, 3.4vw, 2.8rem); }
    .plate__bar {
      display: flex; justify-content: space-between; padding: 8px 14px; border-bottom: 1px solid var(--ink);
      font-size: 0.66rem; color: var(--ink-2); background: var(--paper-2);
    }
    .plate__media { position: relative; aspect-ratio: 16 / 10; overflow: hidden; border-bottom: 1px solid var(--ink); }
    .plate__media img {
      width: 100%; height: 100%; object-fit: cover; filter: grayscale(1);
      transition: filter 0.5s var(--ease), transform 0.8s var(--ease);
    }
    .plate:hover .plate__media img { filter: none; transform: scale(1.03); }
    .plate__blank {
      height: 100%; display: grid; place-items: center; color: var(--ink-3);
      background:
        linear-gradient(to top right, transparent calc(50% - 0.5px), var(--rule) 50%, transparent calc(50% + 0.5px)),
        linear-gradient(to top left, transparent calc(50% - 0.5px), var(--rule) 50%, transparent calc(50% + 0.5px));
    }
    .plate__blank span { background: var(--sheet); padding: 4px 10px; border: 1px solid var(--rule); font-size: 0.8rem; }
    .stamp {
      position: absolute; top: 18px; right: 14px; padding: 6px 12px; transform: rotate(-8deg);
      border: 2px solid var(--stop); color: var(--stop); font-size: 0.78rem; font-weight: 500;
      background: color-mix(in srgb, var(--sheet) 82%, transparent); letter-spacing: 0.14em;
    }
    .plate__body { display: grid; gap: 12px; padding: 20px 18px 18px; align-content: start; flex: 1; }
    .plate__title { font: 400 1.75rem/1.05 var(--serif); }
    .plate__desc { color: var(--ink-2); font-size: 0.95rem; }
    .plate__foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: auto; padding-top: 8px; }
    @media (max-width: 860px) {
      .plates { grid-template-columns: 1fr; }
      .plate--wide { display: flex; }
      .plate--wide .plate__media { aspect-ratio: 16 / 10; min-height: 0; border-right: none; border-bottom: 1px solid var(--ink); }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly store = inject(PortfolioStore);
  protected readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly formOpen = signal(false);
  protected readonly selected = signal<Proyecto | null>(null);
  private readonly broken = signal<ReadonlySet<number | undefined>>(new Set());

  protected imageOf(p: Proyecto): string | null {
    if (this.broken().has(p.idProyecto)) return null;
    return p.listaDeImagenProyectos?.[0]?.imagenUrl ?? null;
  }

  protected markBroken(p: Proyecto): void {
    this.broken.update((s) => new Set(s).add(p.idProyecto));
  }

  protected isUpcoming(p: Proyecto): boolean {
    return /pr[oó]ximamente/i.test(p.fecha ?? '');
  }

  protected initials(name: string): string {
    return name
      .split(/\s+/)
      .filter((w) => /^[A-Za-zÁÉÍÓÚÑ]/.test(w))
      .slice(0, 3)
      .map((w) => w[0].toUpperCase())
      .join('');
  }

  protected link(p: Proyecto): string | null {
    // Los links a localhost no sirven para visitantes
    const url = safeUrl(p.link);
    return url && !/localhost|127\.0\.0\.1/.test(url) ? url : null;
  }

  protected edit(item: Proyecto | null): void {
    this.selected.set(item);
    this.formOpen.set(true);
  }

  protected async remove(item: Proyecto): Promise<void> {
    if (!item.idProyecto) return;
    if (!(await this.confirm.ask(`Se eliminará el proyecto “${item.nombreProyecto}”.`))) return;
    this.api.deleteProyecto(item.idProyecto).subscribe({
      next: () => {
        this.toast.success('Proyecto eliminado.');
        this.store.load();
      },
      error: () => this.toast.error('No se pudo eliminar el proyecto.'),
    });
  }
}
