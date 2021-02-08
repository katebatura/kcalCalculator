import {Component, Input} from '@angular/core';

import {Menu} from '../../../../store/models/common.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() menu: Menu[];

  constructor() { }

}
