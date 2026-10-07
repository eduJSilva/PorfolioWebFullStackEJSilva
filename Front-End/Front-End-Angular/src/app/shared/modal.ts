import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Icon } from './icon';

/** Diálogo modal accesible basado en <dialog> nativo (foco atrapado, Esc para cerrar). */
@Component({
  selector: 'app-modal',
  imports: [Icon],
  template: `
    <dialog #dialog class="modal" (close)="closed.emit()" (click)="onBackdrop($event)" [attr.aria-labelledby]="titleId">
      <div class="modal__panel">
        <header class="modal__header">
          <h2 [id]="titleId" class="modal__title">{{ title() }}</h2>
          <button type="button" class="icon-btn" (click)="dialog.close()" aria-label="Cerrar">
            <app-icon name="close" />
          </button>
        </header>
        <div class="modal__body">
          <ng-content />
        </div>
      </div>
    </dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  private static counter = 0;
  readonly title = input.required<string>();
  readonly open = input(false);
  readonly closed = output<void>();
  protected readonly titleId = `modal-title-${++Modal.counter}`;
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.open() && !el.open) el.showModal();
      if (!this.open() && el.open) el.close();
    });
  }

  protected onBackdrop(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.dialog().nativeElement.close();
  }
}
