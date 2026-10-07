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
    <header class="nav" [class.nav--scrolled]="scrolled()">
      <div class="container nav__inner">
        <a href="#inicio" class="nav__brand" (click)="menuOpen.set(false)">
          <span class="nav__logo">{{ initials() }}</span>
          <span class="nav__name">{{ fullName() }}</span>
        </a>

        <nav class="nav__links" [class.nav__links--open]="menuOpen()" aria-label="Secciones">
          @for (link of links; track link.href) {
            <a [href]="link.href" (click)="menuOpen.set(false)">{{ link.label }}</a>
          }
        </nav>

        <div class="nav__actions">
          @if (auth.isAdmin()) {
            <span class="badge badge--primary nav__admin" title="Modo edición activo">
              <app-icon name="pencil" [size]="14" /> Admin
            </span>
            <button type="button" class="icon-btn" (click)="logout()" aria-label="Cerrar sesión" title="Cerrar sesión">
              <app-icon name="logout" [size]="18" />
            </button>
          }
          <button type="button" class="icon-btn" (click)="theme.toggle()"
            [attr.aria-label]="theme.theme() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'">
            <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" [size]="18" />
          </button>
          <button type="button" class="icon-btn nav__toggle" (click)="menuOpen.set(!menuOpen())"
            [attr.aria-expanded]="menuOpen()" aria-label="Abrir menú">
            <app-icon [name]="menuOpen() ? 'close' : 'menu'" [size]="18" />
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    .nav {
      position: sticky;
      top: 0;
      z-index: 50;
      height: var(--nav-h);
      background: color-mix(in srgb, var(--bg) 75%, transparent);
      backdrop-filter: saturate(180%) blur(14px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .nav--scrolled { border-bottom-color: var(--border); box-shadow: var(--shadow-sm); }
    .nav__inner { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .nav__brand { display: flex; align-items: center; gap: 10px; color: var(--text); font-weight: 700; text-decoration: none; }
    .nav__logo {
      display: grid; place-items: center; width: 38px; height: 38px; border-radius: 11px;
      background: var(--gradient); color: #fff; font-family: var(--font-display); font-size: 0.95rem;
    }
    .nav__name { font-family: var(--font-display); }
    .nav__links { display: flex; gap: 4px; }
    .nav__links a {
      padding: 8px 12px; border-radius: 999px; color: var(--text-muted); font-weight: 500; font-size: 0.92rem;
      text-decoration: none; transition: color 0.2s, background-color 0.2s;
    }
    .nav__links a:hover { color: var(--text); background: var(--bg-muted); }
    .nav__actions { display: flex; align-items: center; gap: 8px; }
    .nav__toggle { display: none; }
    @media (max-width: 900px) {
      .nav__toggle { display: inline-grid; }
      .nav__name, .nav__admin { display: none; }
      .nav__links {
        position: absolute; top: var(--nav-h); left: 0; right: 0; flex-direction: column; padding: 12px 20px 20px;
        background: var(--bg-elevated); border-bottom: 1px solid var(--border); box-shadow: var(--shadow);
        transform: translateY(-8px); opacity: 0; pointer-events: none; transition: opacity 0.2s, transform 0.2s;
      }
      .nav__links--open { transform: none; opacity: 1; pointer-events: auto; }
      .nav__links a { padding: 12px; }
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
  protected readonly links = [
    { href: '#sobre-mi', label: 'Sobre mí' },
    { href: '#experiencia', label: 'Experiencia' },
    { href: '#educacion', label: 'Educación' },
    { href: '#skills', label: 'Skills' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  protected readonly fullName = computed(() => {
    const p = this.store.persona();
    return p ? `${p.nombre.split(' ')[0]} ${p.apellido}` : 'Portfolio';
  });
  protected readonly initials = computed(() => {
    const p = this.store.persona();
    return p ? `${p.nombre[0] ?? ''}${p.apellido[0] ?? ''}`.toUpperCase() : 'EJS';
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
