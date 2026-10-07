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
    <section id="proyectos" class="section section--alt">
      <div class="container">
        <div class="section__head">
          <div>
            <p class="eyebrow"><app-icon name="sparkles" [size]="16" /> Proyectos</p>
            <h2 class="section__title">Lo que construí</h2>
          </div>
          @if (auth.isAdmin()) {
            <button type="button" class="btn btn--primary btn--sm" (click)="edit(null)"><app-icon name="plus" [size]="16" /> Agregar</button>
          }
        </div>

        <div class="grid grid--3">
          @for (p of store.proyectos(); track p.idProyecto) {
            <article class="card card--hover project">
              <div class="project__media">
                @if (imageOf(p); as img) {
                  <img [src]="img" [alt]="'Captura de ' + p.nombreProyecto" loading="lazy" (error)="markBroken(p)" />
                } @else {
                  <div class="project__placeholder" aria-hidden="true"><app-icon name="code" [size]="40" /></div>
                }
              </div>
              <div class="project__body">
                @if (p.fecha) { <span class="badge">{{ p.fecha }}</span> }
                <h3 class="project__title">{{ p.nombreProyecto }}</h3>
                @if (p.descripcion) { <p class="muted">{{ p.descripcion }}</p> }
                @if (link(p); as href) {
                  <a class="btn btn--ghost btn--sm project__link" [href]="href" target="_blank" rel="noopener">
                    Ver proyecto <app-icon name="external" [size]="16" />
                  </a>
                }
              </div>
              @if (auth.isAdmin()) {
                <div class="admin-actions admin-actions--floating">
                  <button type="button" class="icon-btn" (click)="edit(p)" aria-label="Editar proyecto"><app-icon name="pencil" [size]="16" /></button>
                  <button type="button" class="icon-btn icon-btn--danger" (click)="remove(p)" aria-label="Eliminar proyecto"><app-icon name="trash" [size]="16" /></button>
                </div>
              }
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
    .project { padding: 0; overflow: hidden; display: flex; flex-direction: column; }
    .project__media { aspect-ratio: 16 / 10; background: var(--bg-muted); overflow: hidden; }
    .project__media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease); }
    .project:hover .project__media img { transform: scale(1.04); }
    .project__placeholder { height: 100%; display: grid; place-items: center; color: var(--primary); background: var(--primary-soft); }
    .project__body { padding: 20px 22px 24px; display: grid; gap: 8px; align-content: start; flex: 1; justify-items: start; }
    .project__title { font-size: 1.15rem; }
    .project__link { margin-top: 8px; }
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
