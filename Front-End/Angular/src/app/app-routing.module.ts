import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './service/guard.guard';
import { DatosBasicosFormComponent } from './modules/header/components/datos-basicos/datos-basicos-form/datos-basicos-form.component';
import { InicioComponent } from './modules/inicio/inicio.component';
import { LoginComponent } from './modules/inicio/login/login.component';
import { Pagina404Component } from './modules/inicio/pagina404/pagina404.component';
import { PortfolioComponent } from './modules/inicio/portfolio/portfolio.component';
import { RegisterComponent } from './modules/inicio/register/register.component';
import { AcercaDeFormComponent } from './modules/section/components/acerca-de/acerca-de-form/acerca-de-form.component';

const routes: Routes = [
  {path: 'inicio' || '', component: InicioComponent},
  { path: 'inicio/login', component: LoginComponent },
  { path: 'inicio/register', component: RegisterComponent },
  {path: 'portfolio', component: PortfolioComponent, canActivate:[GuardGuard]},
  {path:"", redirectTo:'inicio', pathMatch:'full'},
  {path:'**', component: Pagina404Component},
  {path:'formdatos', component: DatosBasicosFormComponent},
  {path:'formacercade', component: AcercaDeFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
