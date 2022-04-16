import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Este es el Header de la app';
  
  suma= (num1: number, num2:number):number => num1+num2;
  sumar = this.suma(20,4);
  
  constructor() { }

  ngOnInit(): void {
  }

}
