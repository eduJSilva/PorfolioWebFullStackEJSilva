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
  github: string = "https://github.com/Freston2021";
  linkelid: string = "https://www.linkedin.com/in/eduardo-javier-silva-8089a5224";
  twitter: string = "https://twitter.com/Silvaedujavier";

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
    /*
    this.service.getUsers().subscribe((data) => {
      this.github = data[0].github;
      this.linkelid = data[0].linkedin;
      this.twitter = data[0].twitter;
    });
    */
  }

   //Borra las cookies plaf plaf plaf!!!!
   private clearAppData(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.deleteAll();
  }
}
