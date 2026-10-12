import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { Skill } from '../core/models';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { SkillForm } from '../admin/skill-form';
import { ConfirmService } from '../shared/confirm';
import { Icon } from '../shared/icon';

const SEGMENTS = Array.from({ length: 10 }, (_, i) => i);

@Component({
  selector: 'app-skills',
  imports: [Icon, SkillForm],
  template: `
    <section id="stack" class="sheet">
      <div class="wrap">
        <header class="sheet__head">
          <p class="sheet__no"><b>04</b>Hoja</p>
          <h2 class="sheet__title">Stack <em>— lista de materiales</em></h2>
          @if (auth.isAdmin()) {
            <button type="button" class="btn btn--sm" (click)="edit(null)"><app-icon name="plus" [size]="14" /> Agregar</button>
          }
        </header>

        <table class="bom">
          <thead class="mono">
            <tr><th>Cód.</th><th>Ítem</th><th class="bom__hide">Nivel</th><th>Dominio</th><th></th></tr>
          </thead>
          @for (group of groups(); track group.code) {
            <tbody>
              <tr class="bom__group"><td colspan="5" class="mono">{{ group.code }} · {{ group.title }}</td></tr>
              @for (skill of group.items; track skill.idSkill; let i = $index) {
                <tr class="row">
                  <td class="mono bom__code">{{ group.code }}-{{ (i + 1).toString().padStart(2, '0') }}</td>
                  <td class="bom__name">{{ skill.nombreSkill }}</td>
                  <td class="mono bom__level bom__hide">{{ level(skill.dominio) }}</td>
                  <td>
                    <span class="meter" role="meter" [attr.aria-valuenow]="skill.dominio" aria-valuemin="0" aria-valuemax="100"
                      [attr.aria-label]="skill.nombreSkill + ': ' + skill.dominio + '%'">
                      @for (s of segments; track s) {
                        <i [class.on]="s < lit(skill.dominio)"></i>
                      }
                    </span>
                  </td>
                  <td class="bom__tools">
                    @if (auth.isAdmin()) {
                      <span class="admin-actions admin-tools">
                        <button type="button" class="icon-btn icon-btn--sm" (click)="edit(skill)" [attr.aria-label]="'Editar ' + skill.nombreSkill"><app-icon name="pencil" [size]="13" /></button>
                        <button type="button" class="icon-btn icon-btn--sm icon-btn--danger" (click)="remove(skill)" [attr.aria-label]="'Eliminar ' + skill.nombreSkill"><app-icon name="trash" [size]="13" /></button>
                      </span>
                    }
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="muted">Sin ítems cargados.</td></tr>
              }
            </tbody>
          }
        </table>
      </div>
    </section>

    @if (auth.isAdmin() && store.persona(); as p) {
      <app-skill-form [open]="formOpen()" [item]="selected()" [personaId]="p.id" (closed)="formOpen.set(false)" />
    }
  `,
  styles: `
    .bom { width: 100%; border-collapse: collapse; border-top: 1px solid var(--ink); }
    .bom th { text-align: left; font-weight: 500; font-size: 0.62rem; color: var(--ink-3); padding: 8px 12px 8px 0; border-bottom: 1px solid var(--rule); }
    .bom td { padding: 12px 12px 12px 0; border-bottom: 1px solid var(--rule); vertical-align: middle; }
    .bom__group td { padding-top: 28px; color: var(--signal); font-size: 0.68rem; border-bottom-color: var(--ink); }
    .bom__code { width: 90px; color: var(--ink-3); font-size: 0.7rem; }
    .bom__name { font: 400 1.3rem/1.2 var(--serif); }
    .bom__level { color: var(--ink-2); font-size: 0.66rem; width: 130px; }
    .bom__tools { width: 70px; text-align: right; }
    .meter { display: inline-flex; gap: 3px; }
    .meter i { width: 10px; height: 16px; background: var(--paper-2); border: 1px solid var(--rule); }
    .meter i.on { background: var(--ink); border-color: var(--ink); }
    .row:hover .meter i.on { background: var(--signal); border-color: var(--signal); }
    @media (max-width: 640px) {
      .bom__hide { display: none; }
      .bom__code { width: 64px; }
      .meter i { width: 6px; height: 14px; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly store = inject(PortfolioStore);
  protected readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);

  protected readonly formOpen = signal(false);
  protected readonly selected = signal<Skill | null>(null);
  protected readonly segments = SEGMENTS;

  protected readonly groups = computed(() => [
    { code: 'TEC', title: 'Técnicas', items: this.store.skills().filter((s) => s.tipoSkill !== 'soft') },
    { code: 'HUM', title: 'Humanas', items: this.store.skills().filter((s) => s.tipoSkill === 'soft') },
  ]);

  protected lit(dominio: number): number {
    return Math.round(Math.max(0, Math.min(100, dominio)) / 10);
  }

  protected level(dominio: number): string {
    if (dominio >= 80) return 'Avanzado';
    if (dominio >= 50) return 'Intermedio';
    return 'Inicial';
  }

  protected edit(item: Skill | null): void {
    this.selected.set(item);
    this.formOpen.set(true);
  }

  protected async remove(item: Skill): Promise<void> {
    if (!item.idSkill) return;
    if (!(await this.confirm.ask(`Se eliminará “${item.nombreSkill}”.`))) return;
    this.api.deleteSkill(item.idSkill).subscribe({
      next: () => {
        this.toast.success('Ítem eliminado.');
        this.store.load();
      },
      error: () => this.toast.error('No se pudo eliminar el ítem.'),
    });
  }
}
