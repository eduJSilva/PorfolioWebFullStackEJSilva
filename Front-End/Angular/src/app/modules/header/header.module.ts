import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { HeaderService } from './header.service';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselFormComponent } from './components/carousel/carousel-form/carousel-form.component';
import { DatosBasicosComponent } from './components/datos-basicos/datos-basicos.component';
import { DatosBasicosFormComponent } from './components/datos-basicos/datos-basicos-form/datos-basicos-form.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { FotoPrincipalComponent } from './components/carousel/foto-principal/foto-principal.component';
import { FotoPrincipalFormComponent } from './components/carousel/foto-principal/foto-principal-form/foto-principal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BarraSuperiorComponent,
    CarouselComponent,
    CarouselFormComponent,
    FotoPrincipalComponent,
    FotoPrincipalFormComponent,
    DatosBasicosComponent,
    DatosBasicosFormComponent,
    BarraNavegacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HeaderService],

  //Exportación de los componentes para ser usados por otros modulos
  exports: [
    BarraSuperiorComponent,
    CarouselComponent,
    DatosBasicosComponent,
    BarraNavegacionComponent,
  ],
})
export class HeaderModule {}
