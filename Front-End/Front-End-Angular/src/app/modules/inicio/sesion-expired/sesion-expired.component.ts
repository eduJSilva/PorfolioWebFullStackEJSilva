import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-sesion-expired',
  templateUrl: './sesion-expired.component.html',
  styleUrls: ['./sesion-expired.component.css']
})
export class SesionExpiredComponent implements OnInit {

  
  constructor(private cookieService: CookieService, private service: AppService, private route: Router) { }

  refresh(){
    //console.log("FUNCIONA")
    this.clearAppData();
    this.route.navigate(['inicio']);


    this.service.sesionFinalizada = true;
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
