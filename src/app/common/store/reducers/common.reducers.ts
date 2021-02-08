import {Action, createReducer, on} from '@ngrx/store';

import * as commonActions from '../actions/common.actions';

import {Menu} from '../models/common.models';
import {Pending} from '../models';

export interface State{
  menu: Menu[],
  pending: {
    menu: Pending,
  }
}

export const initialState: State = {
  menu: null,
  pending: {
    menu: Pending.None,
  }
};

export const commonReducer = createReducer(
  initialState,

  /**
   * Загрузка меню
   */
  on(commonActions.LoadMenu, (state) => ({
    ...state,
    pending: {
      ...state.pending,
      menu: state.pending.menu === Pending.Error ? Pending.ErrorPending : Pending.Active
    }
  })),
  on(commonActions.MenuLoadedSuccess, (state, action: any) => ({
    ...state,
    menu: action.menu,
    pending: {
      ...state.pending,
      menu: Pending.None
    }
  })),
  on(commonActions.MenuAlreadyLoaded, (state) => ({
    ...state,
    pending: {
      ...state.pending,
      menu: Pending.None
    }
  })),
  on(commonActions.MenuLoadedError, (state) => ({
    ...state,
    pending: {
      ...state.pending,
      menu: Pending.Error
    }
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return commonReducer(state, action);
}
