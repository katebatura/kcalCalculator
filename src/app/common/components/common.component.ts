import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {CommonAppState, selectMenu} from '../store';

import {Menu} from '../store/models/common.models';

import {Observable} from 'rxjs';
import {LoadMenu} from '../store/actions/common.actions';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {

  $menu: Observable<Menu[]> = this.store.pipe(select(selectMenu));

  constructor(private store: Store<CommonAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(LoadMenu());
  }

}
