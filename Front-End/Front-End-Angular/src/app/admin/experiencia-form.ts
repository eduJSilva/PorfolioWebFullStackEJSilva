import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Experiencia } from '../core/models';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { Modal } from '../shared/modal';
import { runSave } from './save';

@Component({
  selector: 'app-experiencia-form',
  imports: [Modal, ReactiveFormsModule],
  template: `
    <app-modal [title]="item() ? 'Editar experiencia' : 'Nueva experiencia'" [open]="open()" (closed)="closed.emit()">
      <form class="form" [formGroup]="form" (ngSubmit)="submit()">
        <div class="field">
          <label for="ex-puesto">Puesto *</label>
          <input id="ex-puesto" class="input" formControlName="puesto" />
        </div>
        <div class="field">
          <label for="ex-empresa">Empresa *</label>
          <input id="ex-empresa" class="input" formControlName="empresa" />
        </div>
        <div class="form-row">
          <div class="field">
            <label for="ex-inicio">Inicio</label>
            <input id="ex-inicio" class="input" formControlName="inicio" placeholder="2021" />
          </div>
          <div class="field">
            <label for="ex-fin">Fin</label>
            <input id="ex-fin" class="input" formControlName="fin" placeholder="presente" />
          </div>
        </div>
        <div class="field">
          <label for="ex-logo">URL del logo</label>
          <input id="ex-logo" class="input" formControlName="imagen" placeholder="https://…" />
        </div>
        <div class="field">
          <label for="ex-desc">Descripción</label>
          <textarea id="ex-desc" class="textarea" formControlName="descripcion"></textarea>
          <span class="hint">Separá las tareas con “;” para mostrarlas como lista.</span>
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
export class ExperienciaForm {
  private readonly api = inject(ApiService);
  private readonly store = inject(PortfolioStore);
  private readonly toast = inject(ToastService);

  readonly open = input(false);
  readonly item = input<Experiencia | null>(null);
  readonly personaId = input.required<number>();
  readonly closed = output<void>();
  protected readonly busy = signal(false);

  protected readonly form = inject(NonNullableFormBuilder).group({
    puesto: ['', Validators.required],
    empresa: ['', Validators.required],
    inicio: [''],
    fin: [''],
    imagen: [''],
    descripcion: [''],
  });

  constructor() {
    effect(() => {
      if (!this.open()) return;
      const e = this.item();
      this.form.reset({
        puesto: e?.puesto ?? '',
        empresa: e?.empresa ?? '',
        inicio: e?.inicio ?? '',
        fin: e?.fin ?? '',
        imagen: e?.imagen ?? '',
        descripcion: e?.descripcion ?? '',
      });
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const body: Experiencia = { ...this.form.getRawValue(), persona: { id: this.personaId() } };
    const id = this.item()?.idExperiencia;
    runSave(
      id ? this.api.updateExperiencia(id, body) : this.api.createExperiencia(body),
      { busy: this.busy, store: this.store, toast: this.toast },
      id ? 'Experiencia actualizada.' : 'Experiencia agregada.',
      () => this.closed.emit(),
    );
  }
}
