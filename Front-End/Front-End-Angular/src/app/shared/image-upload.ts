import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Icon } from './icon';
import { Modal } from './modal';

const MAX_MB = 5;

/** Modal para elegir una imagen, previsualizarla y subirla. */
@Component({
  selector: 'app-image-upload',
  imports: [Modal, Icon],
  template: `
    <app-modal [title]="title()" [open]="open()" (closed)="reset(); closed.emit()">
      <label class="file-drop">
        <input type="file" accept="image/*" class="sr-only" (change)="pick($event)" />
        @if (preview() ?? current(); as img) {
          <img [src]="img" alt="Vista previa" />
        } @else {
          <app-icon name="image" [size]="36" />
        }
        <span>{{ file() ? file()!.name : 'Hacé clic para elegir una imagen (máx. ' + maxMb + ' MB)' }}</span>
      </label>
      @if (error()) {
        <p class="error" style="color: var(--danger); margin-top: 8px">{{ error() }}</p>
      }
      <div class="form-actions">
        <button type="button" class="btn btn--ghost" (click)="reset(); closed.emit()">Cancelar</button>
        <button type="button" class="btn btn--primary" [disabled]="!file() || busy()" (click)="save.emit(file()!)">
          {{ busy() ? 'Subiendo…' : 'Guardar imagen' }}
        </button>
      </div>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUpload {
  readonly title = input('Cambiar imagen');
  readonly open = input(false);
  readonly busy = input(false);
  readonly current = input<string | null>(null);
  readonly save = output<File>();
  readonly closed = output<void>();

  protected readonly maxMb = MAX_MB;
  protected readonly file = signal<File | null>(null);
  protected readonly preview = signal<string | null>(null);
  protected readonly error = signal<string | null>(null);

  protected pick(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.error.set('El archivo debe ser una imagen.');
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      this.error.set(`La imagen supera los ${MAX_MB} MB.`);
      return;
    }
    this.error.set(null);
    this.file.set(file);
    const reader = new FileReader();
    reader.onload = () => this.preview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  reset(): void {
    this.file.set(null);
    this.preview.set(null);
    this.error.set(null);
  }
}
