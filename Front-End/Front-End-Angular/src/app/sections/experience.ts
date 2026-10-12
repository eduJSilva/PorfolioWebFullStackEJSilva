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
    <section id="trayectoria" class="sheet">
      <div class="wrap">
        <header class="sheet__head">
          <p class="sheet__no"><b>02</b>Hoja</p>
          <h2 class="sheet__title">Trayectoria</h2>
          @if (auth.isAdmin()) {
            <button type="button" class="btn btn--sm" (click)="edit(null)"><app-icon name="plus" [size]="14" /> Agregar</button>
          }
        </header>

        <div class="log">
          <div class="log__head mono" aria-hidden="true">
            <span>Período</span><span>Puesto / Empresa</span><span></span>
          </div>
          @for (exp of store.experiencias(); track exp.idExperiencia; let first = $first) {
            <details class="row" [open]="first">
              <summary>
                <span class="row__period mono">{{ period(exp) }}</span>
                <span class="row__main">
                  <span class="row__role">{{ exp.puesto }}</span>
                  <span class="row__org"><app-logo [src]="exp.imagen" [name]="exp.empresa" /> {{ exp.empresa }}</span>
                </span>
                <span class="row__toggle" aria-hidden="true"></span>
              </summary>
              <div class="row__body">
                @let bullets = toBullets(exp.descripcion);
                @if (bullets.length > 1) {
                  <ul class="row__list">
                    @for (b of bullets; track $index) { <li>{{ b }}</li> }
                  </ul>
                } @else if (bullets.length === 1) {
                  <p class="muted">{{ bullets[0] }}</p>
                }
                @if (auth.isAdmin()) {
                  <div class="admin-actions row__admin">
                    <button type="button" class="btn btn--sm" (click)="edit(exp)"><app-icon name="pencil" [size]="14" /> Editar</button>
                    <button type="button" class="btn btn--sm" (click)="remove(exp)"><app-icon name="trash" [size]="14" /> Eliminar</button>
                  </div>
                }
              </div>
            </details>
          } @empty {
            <p class="muted">Sin experiencias cargadas.</p>
          }
        </div>
      </div>
    </section>

    @if (auth.isAdmin() && store.persona(); as p) {
      <app-experiencia-form [open]="formOpen()" [item]="selected()" [personaId]="p.id" (closed)="formOpen.set(false)" />
    }
  `,
  styles: `
    .log { border-top: 1px solid var(--ink); }
    .log__head {
      display: grid; grid-template-columns: 180px 1fr 32px; gap: 24px; padding: 8px 0;
      color: var(--ink-3); font-size: 0.64rem; border-bottom: 1px solid var(--rule);
    }
    .row { border-bottom: 1px solid var(--rule); }
    .row summary {
      display: grid; grid-template-columns: 180px 1fr 32px; gap: 24px; align-items: center;
      padding: 22px 0; cursor: pointer; list-style: none;
    }
    .row summary::-webkit-details-marker { display: none; }
    .row summary:hover .row__role { color: var(--signal); }
    .row__period { color: var(--ink-2); font-size: 0.74rem; }
    .row__main { display: grid; gap: 6px; }
    .row__role { font: 400 clamp(1.5rem, 2.6vw, 2.1rem)/1.1 var(--serif); transition: color 0.2s; }
    .row__org { display: flex; align-items: center; gap: 10px; color: var(--ink-2); font-size: 0.92rem; }
    .row__org app-logo { transform: scale(0.75); transform-origin: left center; margin-right: -10px; }
    .row__toggle { position: relative; width: 16px; height: 16px; justify-self: end; }
    .row__toggle::before, .row__toggle::after {
      content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--ink);
      transition: transform 0.3s var(--ease);
    }
    .row__toggle::after { transform: rotate(90deg); }
    .row[open] .row__toggle::after { transform: rotate(0deg); }
    .row__body { padding: 0 0 28px calc(180px + 24px); display: grid; gap: 16px; }
    .row__list {
      margin: 0; padding: 0; list-style: none; columns: 2; column-gap: 40px; color: var(--ink-2);
    }
    .row__list li { break-inside: avoid; padding: 4px 0 4px 18px; position: relative; }
    .row__list li::before { content: '—'; position: absolute; left: 0; color: var(--signal); }
    @media (max-width: 760px) {
      .log__head { display: none; }
      .row summary { grid-template-columns: 1fr 24px; gap: 8px 16px; }
      .row__period { grid-column: 1 / -1; }
      .row__body { padding-left: 0; }
      .row__list { columns: 1; }
    }
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
