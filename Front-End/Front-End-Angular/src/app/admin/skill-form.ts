import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Skill, TipoSkill } from '../core/models';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { Modal } from '../shared/modal';
import { runSave } from './save';

@Component({
  selector: 'app-skill-form',
  imports: [Modal, ReactiveFormsModule],
  template: `
    <app-modal [title]="item() ? 'Editar skill' : 'Nueva skill'" [open]="open()" (closed)="closed.emit()">
      <form class="form" [formGroup]="form" (ngSubmit)="submit()">
        <div class="field"><label for="sk-nombre">Nombre *</label><input id="sk-nombre" class="input" formControlName="nombreSkill" placeholder="Angular" /></div>
        <div class="field">
          <label for="sk-tipo">Tipo</label>
          <select id="sk-tipo" class="select" formControlName="tipoSkill">
            <option value="hard">Técnica (hard skill)</option>
            <option value="soft">Blanda (soft skill)</option>
          </select>
        </div>
        <div class="field">
          <label for="sk-dominio">Dominio: {{ form.controls.dominio.value }}%</label>
          <input id="sk-dominio" class="range" type="range" min="0" max="100" step="5" formControlName="dominio" />
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn--ghost" (click)="closed.emit()">Cancelar</button>
          <button type="submit" class="btn btn--primary" [disabled]="form.invalid || busy()">{{ busy() ? 'Guardando…' : 'Guardar' }}</button>
        </div>
      </form>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillForm {
  private readonly api = inject(ApiService);
  private readonly store = inject(PortfolioStore);
  private readonly toast = inject(ToastService);

  readonly open = input(false);
  readonly item = input<Skill | null>(null);
  readonly personaId = input.required<number>();
  readonly closed = output<void>();
  protected readonly busy = signal(false);

  protected readonly form = inject(NonNullableFormBuilder).group({
    nombreSkill: ['', Validators.required],
    tipoSkill: ['hard' as TipoSkill],
    dominio: [50, [Validators.min(0), Validators.max(100)]],
  });

  constructor() {
    effect(() => {
      if (!this.open()) return;
      const s = this.item();
      this.form.reset({ nombreSkill: s?.nombreSkill ?? '', tipoSkill: s?.tipoSkill ?? 'hard', dominio: s?.dominio ?? 50 });
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const body: Skill = { ...raw, dominio: Number(raw.dominio), persona: { id: this.personaId() } };
    const id = this.item()?.idSkill;
    runSave(
      id ? this.api.updateSkill(id, body) : this.api.createSkill(body),
      { busy: this.busy, store: this.store, toast: this.toast },
      id ? 'Skill actualizada.' : 'Skill agregada.',
      () => this.closed.emit(),
    );
  }
}
