import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  userLinks: any;
  github?: string;
  linkelid?: string;
  twitter?: string;

  login: any = "login";

  constructor(public service: AppService) {
   
   }
 
  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.userLinks = data.persona[0].links;
      this.github = this.userLinks[0].github;
      this.linkelid = this.userLinks[1].linkedin;
      this.twitter = this.userLinks[2].twitter;
    });
  }

}
