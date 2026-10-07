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
      @if (store.error() && !store.persona()) {
        <section class="section">
          <div class="container" style="text-align: center">
            <div class="alert alert--error" style="justify-content: center; margin-bottom: 20px" role="alert">
              <app-icon name="alert" /> No se pudo cargar el portfolio. El servidor puede estar iniciándose.
            </div>
            <button type="button" class="btn btn--primary" (click)="store.load()"><app-icon name="refresh" [size]="18" /> Reintentar</button>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  protected readonly store = inject(PortfolioStore);

  ngOnInit(): void {
    this.store.load();
  }
}
