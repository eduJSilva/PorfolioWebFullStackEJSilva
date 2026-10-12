import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { PortfolioStore } from '../../core/portfolio.store';
import { About } from '../../sections/about';
import { Contact } from '../../sections/contact';
import { Education } from '../../sections/education';
import { Experience } from '../../sections/experience';
import { Hero } from '../../sections/hero';
import { Navbar } from '../../sections/navbar';
import { Projects } from '../../sections/projects';
import { Skills } from '../../sections/skills';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-home-page',
  imports: [Navbar, Hero, About, Experience, Education, Skills, Projects, Contact, Icon],
  template: `
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <app-navbar />
    <main id="contenido">
      <app-hero />
      @if (store.waking() && !store.persona()) {
        <section class="sheet">
          <div class="wrap status" role="status">
            <span class="signal"><i></i><i class="on wait blink"></i><i></i></span>
            <p class="mono">Encendiendo el servidor… puede tardar unos segundos.</p>
          </div>
        </section>
      }
      @if (store.error() && !store.persona()) {
        <section class="sheet">
          <div class="wrap status" role="alert">
            <span class="signal"><i class="on stop"></i><i></i><i></i></span>
            <p class="mono">No se pudo cargar el portfolio.</p>
            <button type="button" class="btn" (click)="store.load()"><app-icon name="refresh" [size]="14" /> Reintentar</button>
          </div>
        </section>
      }
      @if (store.persona()) {
        <app-about />
        <app-experience />
        <app-education />
        <app-skills />
        <app-projects />
        <app-contact />
      }
    </main>
  `,
  styles: `
    .status { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .blink { animation: blink 1s steps(2) infinite; }
    @keyframes blink { 50% { opacity: 0.2; } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  protected readonly store = inject(PortfolioStore);

  ngOnInit(): void {
    this.store.load();
  }
}
