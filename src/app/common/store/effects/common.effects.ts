import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {select, Store} from "@ngrx/store";

import {CommonAppState, selectMenu} from '../index';

import {CommonActionTypes, MenuAlreadyLoaded, MenuLoadedError, MenuLoadedSuccess} from '../actions/common.actions';

import {CommonService} from '../../services/common.service';

import {Menu} from '../models/common.models';

import {catchError, map, mergeMap, take} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({providedIn: 'root'})
export class CommonEffects {

  /**
   * Загрузка меню
   */
  loadMenu$ = createEffect(() => this.actions$
    .pipe(
      ofType(CommonActionTypes.LoadMenu),
      mergeMap(() => {
        return this.store.pipe(
          select(selectMenu),
          take(1),
          mergeMap((menu: Menu[]) => {
            if(menu?.length)
              return of(MenuAlreadyLoaded());
            return this.commonService.getMenu().pipe(
              map((menu: Menu[]) => MenuLoadedSuccess({menu})),
              catchError(() => of(MenuLoadedError()))
            );
          }),
        );
      })
    ));

  constructor(
    private actions$: Actions,
    private store: Store<CommonAppState>,
    private commonService: CommonService
  ) {}
}
