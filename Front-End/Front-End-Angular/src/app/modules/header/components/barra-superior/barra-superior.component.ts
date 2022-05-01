import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/service/app.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css'],
})
export class BarraSuperiorComponent implements OnInit {

  login: any = 'login';

  constructor(public service: AppService, private ruta: Router, private cookieService: CookieService) {
  }

  logout() {
    this.service.logout().subscribe((data: any) => {
      return console.log("LOGOUT-->",data);
    });
    this.ruta.navigate(['inicio/logout']);
  }

  ngOnInit(): void {
  }

   //Borra las cookies plaf plaf plaf!!!!
   private clearAppData(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.deleteAll();
  }
}
