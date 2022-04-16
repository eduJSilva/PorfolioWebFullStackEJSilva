import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AppService } from 'src/app/service/app.service';
import { AcercaDeFormComponent } from './components/acerca-de/acerca-de-form/acerca-de-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GooglePlaceService } from 'src/app/service/google-place.service';
import { EducacionFormComponent } from './components/educacion/educacion-form/educacion-form.component';
import { ExperienciaFormComponent } from './components/experiencia/experiencia-form/experiencia-form.component';
import { ProyectosFormComponent } from './components/proyectos/proyectos-form/proyectos-form.component';
import { SkillsFormComponent } from './components/skills/skills-form/skills-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SectionComponent,
    ExperienciaComponent,
    EducacionComponent,
    SkillsComponent,
    ProyectosComponent,
    AcercaDeComponent,
    AcercaDeFormComponent,
    EducacionFormComponent,
    ExperienciaFormComponent,
    ProyectosFormComponent,
    SkillsFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCardModule,
    GooglePlaceModule,
    RouterModule
  ],
  providers: [AppService, GooglePlaceService],

  //Exportación de los componentes para ser usados por otros modulos
  exports: [
    SectionComponent,
  ],
})
export class SectionModule { }
