import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, of, switchMap } from 'rxjs';
import { ApiService } from '../core/api.service';
import { Proyecto } from '../core/models';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';
import { Icon } from '../shared/icon';
import { Modal } from '../shared/modal';
import { runSave } from './save';

@Component({
  selector: 'app-proyecto-form',
  imports: [Modal, ReactiveFormsModule, Icon],
  template: `
    <app-modal [title]="item() ? 'Editar proyecto' : 'Nuevo proyecto'" [open]="open()" (closed)="closed.emit()">
      <form class="form" [formGroup]="form" (ngSubmit)="submit()">
        <div class="field"><label for="pr-nombre">Nombre *</label><input id="pr-nombre" class="input" formControlName="nombreProyecto" /></div>
        <div class="form-row">
          <div class="field"><label for="pr-fecha">Fecha</label><input id="pr-fecha" class="input" formControlName="fecha" placeholder="2026" /></div>
          <div class="field"><label for="pr-link">Link</label><input id="pr-link" class="input" formControlName="link" placeholder="https://…" /></div>
        </div>
        <div class="field">
          <label for="pr-desc">Descripción</label>
          <textarea id="pr-desc" class="textarea" formControlName="descripcion" placeholder="Qué hace, stack tecnológico, tu rol…"></textarea>
        </div>
        <div class="field">
          <span class="label">Imagen</span>
          <label class="file-drop">
            <input type="file" accept="image/*" class="sr-only" (change)="pick($event)" />
            @if (preview() ?? currentImage(); as img) {
              <img [src]="img" alt="Vista previa del proyecto" />
            } @else {
              <app-icon name="image" [size]="32" />
            }
            <span>{{ file()?.name ?? 'Elegir imagen (opcional, máx. 5 MB)' }}</span>
          </label>
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
export class ProyectoForm {
  private readonly api = inject(ApiService);
  private readonly store = inject(PortfolioStore);
  private readonly toast = inject(ToastService);

  readonly open = input(false);
  readonly item = input<Proyecto | null>(null);
  readonly personaId = input.required<number>();
  readonly closed = output<void>();
  protected readonly busy = signal(false);
  protected readonly file = signal<File | null>(null);
  protected readonly preview = signal<string | null>(null);
  protected readonly currentImage = signal<string | null>(null);

  protected readonly form = inject(NonNullableFormBuilder).group({
    nombreProyecto: ['', [Validators.required, Validators.maxLength(80)]],
    fecha: [''],
    link: [''],
    descripcion: [''],
  });

  constructor() {
    effect(() => {
      if (!this.open()) return;
      const p = this.item();
      this.file.set(null);
      this.preview.set(null);
      this.currentImage.set(p?.listaDeImagenProyectos?.[0]?.imagenUrl ?? null);
      this.form.reset({
        nombreProyecto: p?.nombreProyecto ?? '',
        fecha: p?.fecha ?? '',
        link: p?.link ?? '',
        descripcion: p?.descripcion ?? '',
      });
    });
  }

  protected pick(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      this.toast.error('Elegí una imagen de hasta 5 MB.');
      return;
    }
    this.file.set(file);
    const reader = new FileReader();
    reader.onload = () => this.preview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) return;
    const body: Proyecto = { ...this.form.getRawValue(), persona: { id: this.personaId() } };
    const file = this.file();
    const id = this.item()?.idProyecto;

    const request: Observable<unknown> = id
      ? this.api.updateProyecto(id, body).pipe(
          switchMap(() => (file ? this.api.replaceImagenProyecto(id, file) : of(null))),
        )
      : this.api.createProyecto(body).pipe(
          switchMap((created) =>
            file && created?.idProyecto ? this.api.uploadImagenProyecto(created.idProyecto, file) : of(null),
          ),
          map(() => null),
        );

    runSave(
      request,
      { busy: this.busy, store: this.store, toast: this.toast },
      id ? 'Proyecto actualizado.' : 'Proyecto agregado.',
      () => this.closed.emit(),
    );
  }
}
