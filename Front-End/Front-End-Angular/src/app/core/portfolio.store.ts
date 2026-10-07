import { Injectable, computed, inject, signal } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ImagenSubida, Persona } from './models';

/** Estado del portfolio: se carga una vez y se refresca tras cada edición (sin recargar la página). */
@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly api = inject(ApiService);

  readonly persona = signal<Persona | null>(null);
  readonly fotos = signal<ImagenSubida[]>([]);
  readonly portadas = signal<ImagenSubida[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly foto = computed(() => this.fotos().at(-1)?.imagenUrl ?? 'assets/foto_de_perfil/Foto_2021.png');
  readonly portada = computed(() => this.portadas().at(-1)?.imagenUrl ?? null);

  readonly experiencias = computed(() =>
    [...(this.persona()?.listaDeExperiencias ?? [])].sort((a, b) => yearOf(b.inicio) - yearOf(a.inicio)),
  );
  readonly educacion = computed(() =>
    [...(this.persona()?.listaDeEducacion ?? [])].sort((a, b) => yearOf(b.inicio) - yearOf(a.inicio)),
  );
  readonly skills = computed(() =>
    [...(this.persona()?.listaDeSkills ?? [])].sort((a, b) => b.dominio - a.dominio),
  );
  readonly proyectos = computed(() =>
    [...(this.persona()?.listaDeProyectos ?? [])].sort((a, b) => (b.idProyecto ?? 0) - (a.idProyecto ?? 0)),
  );

  load(): void {
    this.loading.set(this.persona() === null);
    this.error.set(false);
    forkJoin({
      personas: this.api.getPersonas(),
      fotos: this.api.getFotos().pipe(catchError(() => of([] as ImagenSubida[]))),
      portadas: this.api.getPortadas().pipe(catchError(() => of([] as ImagenSubida[]))),
    }).subscribe({
      next: ({ personas, fotos, portadas }) => {
        this.persona.set(personas[0] ?? null);
        this.fotos.set(fotos);
        this.portadas.set(portadas);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}

/** Convierte "2017", "2017-03-01" o "24/04/22" en un número comparable; "presente"/vacío => muy reciente. */
export function yearOf(value?: string | null): number {
  if (!value) return 0;
  const v = value.trim().toLowerCase();
  if (v === 'presente' || v === 'actualidad' || v === 'actual') return 9999;
  const iso = /^(\d{4})/.exec(v);
  if (iso) return Number(iso[1]);
  const dmy = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/.exec(v);
  if (dmy) {
    const y = Number(dmy[3]);
    return y < 100 ? 2000 + y : y;
  }
  return 0;
}

/** Formatea fechas guardadas como texto libre para mostrarlas de forma consistente. */
export function formatPeriod(inicio?: string | null, fin?: string | null): string {
  const f = (v?: string | null) => {
    if (!v) return '';
    const iso = /^(\d{4})-(\d{2})/.exec(v);
    if (iso) {
      const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
      return `${months[Number(iso[2]) - 1] ?? ''} ${iso[1]}`.trim();
    }
    return v.charAt(0).toUpperCase() + v.slice(1);
  };
  const a = f(inicio);
  const b = f(fin) || 'Presente';
  return a ? `${a} — ${b}` : b;
}
