import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselFormComponent } from './components/carousel/carousel-form/carousel-form.component';
import { DatosBasicosComponent } from './components/datos-basicos/datos-basicos.component';
import { DatosBasicosFormComponent } from './components/datos-basicos/datos-basicos-form/datos-basicos-form.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { FotoPrincipalComponent } from './components/carousel/foto-principal/foto-principal.component';
import { FotoPrincipalFormComponent } from './components/carousel/foto-principal/foto-principal-form/foto-principal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GooglePlaceService } from 'src/app/service/google-place.service';
import { HeaderComponent } from './header.component';
import { AppService } from 'src/app/service/app.service';
import { RouterModule } from '@angular/router';

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
    HeaderComponent,
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
  exports: [HeaderComponent, DatosBasicosFormComponent],
})
export class HeaderModule {}
