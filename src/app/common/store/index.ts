import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as common from './reducers/common.reducers';
import * as recipes from './reducers/recipes.reducers';

import {Pending} from './models';
import {Recipe} from './models/recipes.models';
import {UnavailableData} from '../../shared/directives/unavailable.directive';
import {Menu} from './models/common.models';

export interface CommonAppState{
  common: common.State,
  recipes: recipes.State,
}

export const reducers: ActionReducerMap<CommonAppState> = {
  common: common.reducer,
  recipes: recipes.reducer,
};

export const selectCommonAppState = createFeatureSelector<CommonAppState>('commonApp');

/*-------------------------------------------------COMMON-------------------------------------------------*/
export const selectCommonState = createSelector(
  selectCommonAppState,
  (state: CommonAppState) => state.common
);

export const selectMenu = createSelector(
  selectCommonState,
  (state: common.State): Menu[] => state.menu
);

export const selectMenuPending = createSelector(
  selectCommonState,
  (state: common.State): boolean => state.pending.menu === Pending.Active
);

export const selectAppPending = createSelector(
  selectMenuPending,
  (menu: boolean): boolean => menu
);

export const selectAppError = createSelector(
  selectCommonState,
  (state: common.State): UnavailableData => ({
    unavailable: [Pending.Error, Pending.ErrorPending].includes(state.pending.menu),
    pending: state.pending.menu === Pending.ErrorPending
  })
);


/*-------------------------------------------------RECIPES-------------------------------------------------*/
export const selectRecipesState = createSelector(
  selectCommonAppState,
  (state: CommonAppState) => state.recipes
);

export const selectRecipes = createSelector(
  selectRecipesState,
  recipes.selectAllRecipes
);

export const selectRecipesEntities = createSelector(
  selectRecipesState,
  recipes.selectRecipesEntities
);

export const selectLoadRecipesPending = createSelector(
  selectRecipesState,
  (state: recipes.State): boolean => state.pending.getAll === Pending.Active
);

export const selectLoadRecipesError = createSelector(
  selectRecipesState,
  (state: recipes.State): UnavailableData => ({
    unavailable: [Pending.Error, Pending.ErrorPending].includes(state.pending.getAll),
    pending: state.pending.getAll === Pending.ErrorPending
  })
);

export const selectRecipe = createSelector(
  selectRecipesEntities,
  (recipes: any, id: number): Recipe => recipes[id]
);

export const selectLoadRecipePending = createSelector(
  selectRecipesState,
  (state: recipes.State): boolean => state.pending.getOne === Pending.Active
);

export const selectLoadRecipeError = createSelector(
  selectRecipesState,
  (state: recipes.State): UnavailableData => ({
    unavailable: [Pending.Error, Pending.ErrorPending].includes(state.pending.getOne),
    pending: state.pending.getOne === Pending.ErrorPending
  })
);

export const selectAddRecipePending = createSelector(
  selectRecipesState,
  (state: recipes.State): boolean => state.pending.addRecipe === Pending.Active
);

export const selectUpdateRecipePending = createSelector(
  selectRecipesState,
  (state: recipes.State): boolean => state.pending.updateRecipe === Pending.Active
);

export const selectDeleteRecipePending = createSelector(
  selectRecipesEntities,
  (recipes: any, id: number): boolean => recipes[id].PENDING.DELETE === Pending.Active
);
