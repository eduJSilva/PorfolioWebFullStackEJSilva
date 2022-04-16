import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  constructor(public service: AppService) {}

  ngOnInit(): void {
    this.service.getUsuario().subscribe(
      (data) => {
        console.log(data)
        this.service.onlyRead = false;
      },
      (err) => {
        // Entra aquí si el servicio entrega un código http de error EJ: 404,
        console.log("No es Administrador!-->",err);
        this.service.onlyRead = true;
      }
    );
  }
}
