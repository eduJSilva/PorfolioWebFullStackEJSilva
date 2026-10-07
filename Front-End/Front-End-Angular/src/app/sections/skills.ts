import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { Skill } from '../core/models';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { SkillForm } from '../admin/skill-form';
import { ConfirmService } from '../shared/confirm';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-skills',
  imports: [Icon, SkillForm],
  template: `
    <section id="skills" class="section">
      <div class="container">
        <div class="section__head">
          <div>
            <p class="eyebrow"><app-icon name="code" [size]="16" /> Skills</p>
            <h2 class="section__title">Habilidades</h2>
          </div>
          @if (auth.isAdmin()) {
            <button type="button" class="btn btn--primary btn--sm" (click)="edit(null)"><app-icon name="plus" [size]="16" /> Agregar</button>
          }
        </div>

        <div class="grid grid--2">
          @for (group of groups(); track group.title) {
            <div class="card">
              <h3 class="skills__title">{{ group.title }}</h3>
              <ul class="skills">
                @for (skill of group.items; track skill.idSkill) {
                  <li class="skill">
                    <div class="skill__row">
                      <span class="skill__name">{{ skill.nombreSkill }}</span>
                      <span class="skill__level muted">{{ level(skill.dominio) }}</span>
                      @if (auth.isAdmin()) {
                        <span class="admin-actions">
                          <button type="button" class="icon-btn icon-btn--sm" (click)="edit(skill)" [attr.aria-label]="'Editar ' + skill.nombreSkill"><app-icon name="pencil" [size]="14" /></button>
                          <button type="button" class="icon-btn icon-btn--sm icon-btn--danger" (click)="remove(skill)" [attr.aria-label]="'Eliminar ' + skill.nombreSkill"><app-icon name="trash" [size]="14" /></button>
                        </span>
                      }
                    </div>
                    <div class="bar" role="progressbar" [attr.aria-valuenow]="skill.dominio" aria-valuemin="0" aria-valuemax="100" [attr.aria-label]="skill.nombreSkill">
                      <span [style.width.%]="skill.dominio"></span>
                    </div>
                  </li>
                } @empty {
                  <li class="muted">Sin skills cargadas.</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>

    @if (auth.isAdmin() && store.persona(); as p) {
      <app-skill-form [open]="formOpen()" [item]="selected()" [personaId]="p.id" (closed)="formOpen.set(false)" />
    }
  `,
  styles: `
    .skills__title { font-size: 1.05rem; margin-bottom: 18px; }
    .skills { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; }
    .skill__row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
    .skill__name { font-weight: 600; flex: 1; }
    .skill__level { font-size: 0.82rem; }
    .bar { height: 8px; border-radius: 999px; background: var(--bg-muted); overflow: hidden; }
    .bar span { display: block; height: 100%; border-radius: inherit; background: var(--gradient); animation: grow 1s var(--ease) both; transform-origin: left; }
    @keyframes grow { from { transform: scaleX(0); } }
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

  protected readonly groups = computed(() => [
    { title: 'Técnicas', items: this.store.skills().filter((s) => s.tipoSkill !== 'soft') },
    { title: 'Blandas', items: this.store.skills().filter((s) => s.tipoSkill === 'soft') },
  ]);

  protected level(dominio: number): string {
    if (dominio >= 80) return 'Avanzado';
    if (dominio >= 50) return 'Intermedio';
    return 'Básico';
  }

  protected edit(item: Skill | null): void {
    this.selected.set(item);
    this.formOpen.set(true);
  }

  protected async remove(item: Skill): Promise<void> {
    if (!item.idSkill) return;
    if (!(await this.confirm.ask(`Se eliminará la skill “${item.nombreSkill}”.`))) return;
    this.api.deleteSkill(item.idSkill).subscribe({
      next: () => {
        this.toast.success('Skill eliminada.');
        this.store.load();
      },
      error: () => this.toast.error('No se pudo eliminar la skill.'),
    });
  }
}
