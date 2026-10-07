import { WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioStore } from '../core/portfolio.store';
import { ToastService } from '../core/toast.service';

/** Ejecuta una operación de guardado: maneja el estado "guardando", avisa y refresca el portfolio. */
export function runSave(
  request: Observable<unknown>,
  ctx: { busy: WritableSignal<boolean>; store: PortfolioStore; toast: ToastService },
  successMessage: string,
  onDone: () => void,
): void {
  ctx.busy.set(true);
  request.subscribe({
    next: () => {
      ctx.busy.set(false);
      ctx.toast.success(successMessage);
      ctx.store.load();
      onDone();
    },
    error: (err) => {
      ctx.busy.set(false);
      ctx.toast.error(
        err?.status === 403 ? 'No tenés permisos para editar el portfolio.' : 'No se pudieron guardar los cambios.',
      );
    },
  });
}
