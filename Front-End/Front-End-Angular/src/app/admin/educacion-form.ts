import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Educacion } from '../core/models';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { Modal } from '../shared/modal';
import { runSave } from './save';

export const NIVELES = ['Secundario', 'Terciario', 'Universitario', 'Posgrado', 'Curso', 'Certificación'];
export const ESTADOS = ['Graduado', 'En curso', 'Incompleto'];

@Component({
  selector: 'app-educacion-form',
  imports: [Modal, ReactiveFormsModule],
  template: `
    <app-modal [title]="item() ? 'Editar formación' : 'Nueva formación'" [open]="open()" (closed)="closed.emit()">
      <form class="form" [formGroup]="form" (ngSubmit)="submit()">
        <div class="field"><label for="ed-titulo">Título *</label><input id="ed-titulo" class="input" formControlName="titulo" /></div>
        <div class="field"><label for="ed-escuela">Institución *</label><input id="ed-escuela" class="input" formControlName="escuela" /></div>
        <div class="field"><label for="ed-carrera">Carrera / programa</label><input id="ed-carrera" class="input" formControlName="carrera" /></div>
        <div class="form-row">
          <div class="field">
            <label for="ed-nivel">Nivel</label>
            <select id="ed-nivel" class="select" formControlName="nivel">
              @for (n of niveles; track n) { <option [value]="n">{{ n }}</option> }
            </select>
          </div>
          <div class="field">
            <label for="ed-estado">Estado</label>
            <select id="ed-estado" class="select" formControlName="estado">
              @for (e of estados; track e) { <option [value]="e">{{ e }}</option> }
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="field"><label for="ed-inicio">Inicio</label><input id="ed-inicio" class="input" formControlName="inicio" placeholder="2021" /></div>
          <div class="field"><label for="ed-fin">Fin</label><input id="ed-fin" class="input" formControlName="fin" placeholder="2022" /></div>
        </div>
        <div class="field"><label for="ed-logo">URL del logo</label><input id="ed-logo" class="input" formControlName="imagen" placeholder="https://…" /></div>
        <div class="form-actions">
          <button type="button" class="btn btn--ghost" (click)="closed.emit()">Cancelar</button>
          <button type="submit" class="btn btn--primary" [disabled]="form.invalid || busy()">{{ busy() ? 'Guardando…' : 'Guardar' }}</button>
        </div>
      </form>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducacionForm {
  private readonly api = inject(ApiService);
  private readonly store = inject(PortfolioStore);
  private readonly toast = inject(ToastService);

  readonly open = input(false);
  readonly item = input<Educacion | null>(null);
  readonly personaId = input.required<number>();
  readonly closed = output<void>();
  protected readonly busy = signal(false);
  protected readonly niveles = NIVELES;
  protected readonly estados = ESTADOS;

  protected readonly form = inject(NonNullableFormBuilder).group({
    titulo: ['', Validators.required],
    escuela: ['', Validators.required],
    carrera: [''],
    nivel: ['Curso'],
    estado: ['Graduado'],
    inicio: [''],
    fin: [''],
    imagen: [''],
  });

  constructor() {
    effect(() => {
      if (!this.open()) return;
      const e = this.item();
      this.form.reset({
        titulo: e?.titulo ?? '',
        escuela: e?.escuela ?? '',
        carrera: e?.carrera ?? '',
        nivel: e?.nivel ?? 'Curso',
        estado: e?.estado ?? 'Graduado',
        inicio: e?.inicio ?? '',
        fin: e?.fin ?? '',
        imagen: e?.imagen ?? '',
      });
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const body: Educacion = { ...this.form.getRawValue(), puntaje: this.item()?.puntaje ?? 0, persona: { id: this.personaId() } };
    const id = this.item()?.idEducacion;
    runSave(
      id ? this.api.updateEducacion(id, body) : this.api.createEducacion(body),
      { busy: this.busy, store: this.store, toast: this.toast },
      id ? 'Formación actualizada.' : 'Formación agregada.',
      () => this.closed.emit(),
    );
  }
}
