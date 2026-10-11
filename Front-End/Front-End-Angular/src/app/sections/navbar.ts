import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { PortfolioStore } from '../core/portfolio.store';
import { ThemeService } from '../core/theme.service';
import { ToastService } from '../core/toast.service';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-navbar',
  imports: [Icon],
  template: `
    <header class="bar" [class.bar--scrolled]="scrolled()">
      <div class="wrap bar__inner">
        <a href="#inicio" class="bar__brand" (click)="menuOpen.set(false)" aria-label="Inicio">
          <span class="bar__mark">{{ initials() }}</span>
          <span class="bar__ref mono">Ficha técnica · Rev. {{ revision }}</span>
        </a>

        <nav class="bar__nav" [class.bar__nav--open]="menuOpen()" aria-label="Secciones">
          @for (link of links; track link.href; let i = $index) {
            <a [href]="link.href" (click)="menuOpen.set(false)">
              <span class="bar__idx">{{ (i + 1).toString().padStart(2, '0') }}</span>{{ link.label }}
            </a>
          }
        </nav>

        <div class="bar__actions">
          @if (auth.isAdmin()) {
            <span class="bar__admin mono">Edición</span>
            <button type="button" class="icon-btn" (click)="logout()" aria-label="Cerrar sesión" title="Cerrar sesión">
              <app-icon name="logout" [size]="16" />
            </button>
          }
          <button
            type="button"
            class="lamp"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.theme() === 'dark' ? 'Pasar a modo día' : 'Pasar a modo noche'"
            [title]="theme.theme() === 'dark' ? 'Modo día' : 'Modo noche'"
          >
            <i [class.on]="theme.theme() === 'dark'" class="lamp__r"></i>
            <i [class.on]="theme.theme() === 'dark'" class="lamp__a"></i>
            <i [class.on]="theme.theme() !== 'dark'" class="lamp__g"></i>
          </button>
          <button type="button" class="icon-btn bar__toggle" (click)="menuOpen.set(!menuOpen())"
            [attr.aria-expanded]="menuOpen()" aria-label="Abrir menú">
            <app-icon [name]="menuOpen() ? 'close' : 'menu'" [size]="16" />
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    .bar {
      position: sticky; top: 0; z-index: 50; height: var(--bar);
      background: var(--paper); border-bottom: 1px solid transparent;
      transition: border-color 0.3s;
    }
    .bar--scrolled { border-bottom-color: var(--ink); }
    .bar__inner { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
    .bar__brand { display: flex; align-items: center; gap: 14px; text-decoration: none; }
    .bar__mark {
      display: grid; place-items: center; height: 32px; padding: 0 8px; border: 1px solid var(--ink);
      font: 500 0.78rem var(--mono); letter-spacing: 0.12em;
    }
    .bar__ref { color: var(--ink-3); font-size: 0.68rem; }
    .bar__nav { display: flex; gap: 2px; }
    .bar__nav a {
      display: flex; align-items: baseline; gap: 6px; padding: 6px 10px; text-decoration: none;
      font-size: 0.88rem; color: var(--ink-2); transition: color 0.2s;
    }
    .bar__nav a:hover { color: var(--ink); }
    .bar__idx { font: 500 0.62rem var(--mono); color: var(--signal); }
    .bar__actions { display: flex; align-items: center; gap: 8px; }
    .bar__admin { padding: 4px 8px; background: var(--signal); color: var(--signal-ink); font-size: 0.64rem; }
    .lamp {
      display: inline-flex; flex-direction: column; gap: 3px; padding: 5px 7px; cursor: pointer;
      background: #17160f; border: 1px solid #3a3a36; border-radius: 10px;
    }
    .lamp i { width: 8px; height: 8px; border-radius: 50%; background: #3a3a36; transition: background-color 0.3s, box-shadow 0.3s; }
    .lamp__r.on { background: #e5533b; box-shadow: 0 0 6px #e5533b; }
    .lamp__a.on { background: #ffb547; box-shadow: 0 0 6px #ffb547; }
    .lamp__g.on { background: #4fc27b; box-shadow: 0 0 6px #4fc27b; }
    .bar__toggle { display: none; }
    @media (max-width: 980px) {
      .bar__ref { display: none; }
    }
    @media (max-width: 860px) {
      .bar__toggle { display: inline-grid; }
      .bar__nav {
        position: absolute; top: var(--bar); left: 0; right: 0; flex-direction: column; padding: 8px var(--gutter) 20px;
        background: var(--paper); border-bottom: 1px solid var(--ink);
        clip-path: inset(0 0 100% 0); transition: clip-path 0.35s var(--ease);
      }
      .bar__nav--open { clip-path: inset(0 0 0 0); }
      .bar__nav a { padding: 12px 0; font-size: 1.1rem; border-bottom: 1px solid var(--rule); }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  private readonly store = inject(PortfolioStore);
  private readonly toast = inject(ToastService);

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly revision = revisionLabel();
  protected readonly links = [
    { href: '#perfil', label: 'Perfil' },
    { href: '#trayectoria', label: 'Trayectoria' },
    { href: '#formacion', label: 'Formación' },
    { href: '#stack', label: 'Stack' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  protected readonly initials = computed(() => {
    const p = this.store.persona();
    if (!p) return 'E·J·S';
    const names = `${p.nombre} ${p.apellido}`.split(/\s+/).filter(Boolean);
    return names.map((n) => n[0].toUpperCase()).join('·');
  });

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  protected logout(): void {
    this.auth.logout().subscribe({
      next: () => this.toast.success('Sesión cerrada.'),
      error: () => this.toast.show('Sesión cerrada.'),
    });
  }
}

/** "2026.10": año y mes actuales, como la revisión de un plano. */
export function revisionLabel(date = new Date()): string {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
}
