import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: any[] = [
    {
      LABEL: 'Калькулятор',
      URL: 'recipe/create',
      ICON: 'add'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
