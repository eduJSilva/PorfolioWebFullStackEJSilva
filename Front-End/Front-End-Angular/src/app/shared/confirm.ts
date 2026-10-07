import { ChangeDetectionStrategy, Component, Injectable, inject, signal } from '@angular/core';
import { Modal } from './modal';

interface ConfirmRequest {
  title: string;
  message: string;
  confirmLabel: string;
  resolve: (ok: boolean) => void;
}

/** Reemplaza window.confirm por un diálogo con el estilo del sitio. */
@Injectable({ providedIn: 'root' })
export class ConfirmService {
  readonly request = signal<ConfirmRequest | null>(null);

  ask(message: string, title = '¿Estás seguro?', confirmLabel = 'Eliminar'): Promise<boolean> {
    return new Promise((resolve) => this.request.set({ title, message, confirmLabel, resolve }));
  }

  answer(ok: boolean): void {
    this.request()?.resolve(ok);
    this.request.set(null);
  }
}

@Component({
  selector: 'app-confirm-host',
  imports: [Modal],
  template: `
    @let req = confirm.request();
    <app-modal [title]="req?.title ?? ''" [open]="!!req" (closed)="confirm.answer(false)">
      <p class="muted">{{ req?.message }}</p>
      <div class="form-actions">
        <button type="button" class="btn btn--ghost" (click)="confirm.answer(false)">Cancelar</button>
        <button type="button" class="btn btn--danger" (click)="confirm.answer(true)">{{ req?.confirmLabel }}</button>
      </div>
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmHost {
  protected readonly confirm = inject(ConfirmService);
}
