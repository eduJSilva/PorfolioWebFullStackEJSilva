import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['../../section.component.css','./skills.component.css']
})
export class SkillsComponent implements OnInit {

  constructor(public service: AppService) { }

  ngOnInit(): void {
  }

}
