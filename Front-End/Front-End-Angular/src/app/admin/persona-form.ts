import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Persona } from '../core/models';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { Modal } from '../shared/modal';
import { runSave } from './save';

@Component({
  selector: 'app-persona-form',
  imports: [Modal, ReactiveFormsModule],
  template: `
    <app-modal title="Datos personales" [open]="open()" (closed)="closed.emit()">
      <form class="form" [formGroup]="form" (ngSubmit)="submit()">
        <div class="form-row">
          <div class="field"><label for="pf-nombre">Nombre</label><input id="pf-nombre" class="input" formControlName="nombre" /></div>
          <div class="field"><label for="pf-apellido">Apellido</label><input id="pf-apellido" class="input" formControlName="apellido" /></div>
        </div>
        <div class="field"><label for="pf-puesto">Título profesional</label><input id="pf-puesto" class="input" formControlName="puesto" placeholder="Full Stack Developer" /></div>
        <div class="form-row">
          <div class="field"><label for="pf-email">Email</label><input id="pf-email" class="input" type="email" formControlName="email" /></div>
          <div class="field"><label for="pf-tel">Teléfono / WhatsApp</label><input id="pf-tel" class="input" formControlName="telefono" placeholder="1161085258" /></div>
        </div>
        <div class="form-row">
          <div class="field"><label for="pf-ciudad">Ciudad</label><input id="pf-ciudad" class="input" formControlName="ciudad" /></div>
          <div class="field"><label for="pf-prov">Provincia</label><input id="pf-prov" class="input" formControlName="provincia" /></div>
        </div>
        <details>
          <summary class="label" style="cursor: pointer">Instituciones destacadas</summary>
          <div class="form" style="margin-top: 12px">
            <div class="form-row">
              <div class="field"><label for="pf-i1">Institución 1</label><input id="pf-i1" class="input" formControlName="institucionUno" /></div>
              <div class="field"><label for="pf-l1">Link</label><input id="pf-l1" class="input" formControlName="linkInstitucionUno" /></div>
            </div>
            <div class="field"><label for="pf-lg1">URL del logo</label><input id="pf-lg1" class="input" formControlName="logoInstitucionUno" /></div>
            <div class="form-row">
              <div class="field"><label for="pf-i2">Institución 2</label><input id="pf-i2" class="input" formControlName="institucionDos" /></div>
              <div class="field"><label for="pf-l2">Link</label><input id="pf-l2" class="input" formControlName="linkInstitucionDos" /></div>
            </div>
            <div class="field"><label for="pf-lg2">URL del logo</label><input id="pf-lg2" class="input" formControlName="logoInstitucionDos" /></div>
          </div>
        </details>
        <div class="form-actions">
          <button type="button" class="btn btn--ghost" (click)="closed.emit()">Cancelar</button>
          <button type="submit" class="btn btn--primary" [disabled]="form.invalid || busy()">{{ busy() ? 'Guardando…' : 'Guardar' }}</button>
        </div>
      </form>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonaForm {
  private readonly api = inject(ApiService);
  private readonly store = inject(PortfolioStore);
  private readonly toast = inject(ToastService);

  readonly open = input(false);
  readonly persona = input.required<Persona>();
  readonly closed = output<void>();
  protected readonly busy = signal(false);

  protected readonly form = inject(NonNullableFormBuilder).group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    puesto: [''],
    email: ['', Validators.email],
    telefono: ['', Validators.pattern(/^[\d\s+()-]*$/)],
    ciudad: [''],
    provincia: [''],
    institucionUno: [''],
    linkInstitucionUno: [''],
    logoInstitucionUno: [''],
    institucionDos: [''],
    linkInstitucionDos: [''],
    logoInstitucionDos: [''],
  });

  constructor() {
    effect(() => {
      if (!this.open()) return;
      const p = this.persona();
      const controls = Object.keys(this.form.controls) as (keyof Persona & keyof typeof this.form.controls)[];
      this.form.reset(Object.fromEntries(controls.map((k) => [k, (p[k] as string | null) ?? ''])));
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    runSave(
      this.api.updatePersona(this.form.getRawValue()),
      { busy: this.busy, store: this.store, toast: this.toast },
      'Datos personales actualizados.',
      () => this.closed.emit(),
    );
  }
}
