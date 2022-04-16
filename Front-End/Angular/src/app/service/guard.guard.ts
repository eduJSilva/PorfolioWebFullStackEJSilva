import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
 constructor(private autenticacionServicio:AutenticacionService, private rutas: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser=this.autenticacionServicio.UsuarioAutenticado;
      if(currentUser && currentUser.accessToken){
        console.log("ok-autentificación,paso el GUARD--> pudiendo acceder al portfolio-DESPUES BORRAR")

    return true;
   }else{
     console.log("esta funcionando el guard-no pudiendo acceder al portfolio si no se esta autenticado-DESPUES BORRAR")
     this.rutas.navigate(['inicio']);
    return false;}
     
  }
  
}
