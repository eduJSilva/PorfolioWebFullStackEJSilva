import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

/** Logo de empresa/institución con iniciales como respaldo si la imagen falla o no existe. */
@Component({
  selector: 'app-logo',
  template: `
    @if (src() && !failed()) {
      <div class="logo-box"><img [src]="src()" [alt]="'Logo de ' + name()" loading="lazy" (error)="failed.set(true)" /></div>
    } @else {
      <div class="logo-box logo-box--fallback" aria-hidden="true">{{ initials() }}</div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  readonly src = input<string | null | undefined>();
  readonly name = input('');
  protected readonly failed = signal(false);
  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter((w) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(w))
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join(''),
  );
}
