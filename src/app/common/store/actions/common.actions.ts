import {createAction, props} from '@ngrx/store';

import {Menu} from '../models/common.models';

export enum CommonActionTypes{
  LoadMenu = '[Menu] Load Menu',
  MenuLoadedSuccess = '[Menu] Menu Loaded Success',
  MenuAlreadyLoaded = '[Menu] Menu Already Loaded',
  MenuLoadedError = '[Menu] Menu Loaded Error',
}

/**
 * Загрузка меню
 */
export const LoadMenu = createAction(CommonActionTypes.LoadMenu);

export const MenuLoadedSuccess = createAction(
  CommonActionTypes.MenuLoadedSuccess,
  props<{menu: Menu[]}>()
);

export const MenuAlreadyLoaded = createAction(CommonActionTypes.MenuAlreadyLoaded);

export const MenuLoadedError = createAction(CommonActionTypes.MenuLoadedError);
