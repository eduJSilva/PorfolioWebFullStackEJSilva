import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './modules/header/header.module';
import {SectionModule} from './modules/section/section.module';
import { FooterModule } from './modules/footer/footer.module';
import { InicioComponent } from './modules/inicio/inicio.component';
import { Pagina404Component } from './modules/inicio/pagina404/pagina404.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './modules/inicio/login/login.component';
import { RegisterComponent } from './modules/inicio/register/register.component';
import { PortfolioComponent } from './modules/inicio/portfolio/portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './service/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Pagina404Component,
    LoginComponent,
    RegisterComponent,
    PortfolioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    SectionModule,
    FooterModule,
    RouterModule,
    ReactiveFormsModule,
   

    BrowserAnimationsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
