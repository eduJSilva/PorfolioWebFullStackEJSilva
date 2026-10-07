import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Eduardo J. Silva · Full Stack Developer',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomePage),
  },
  {
    path: 'login',
    title: 'Ingresar · Portfolio',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginPage),
  },
  {
    path: 'recuperar',
    title: 'Recuperar contraseña · Portfolio',
    loadComponent: () => import('./pages/recuperar/recuperar').then((m) => m.RecuperarPage),
  },
  {
    path: 'restablecer',
    title: 'Nueva contraseña · Portfolio',
    loadComponent: () => import('./pages/restablecer/restablecer').then((m) => m.RestablecerPage),
  },
  // Rutas de la versión anterior
  { path: 'inicio', redirectTo: '' },
  { path: 'portfolio', redirectTo: '' },
  { path: 'inicio/login', redirectTo: 'login' },
  {
    path: '**',
    title: 'Página no encontrada · Portfolio',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
];
