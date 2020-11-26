import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as recipes from './reducers/recipes.reducers';

import {Pending} from "./models";
import {Recipe} from "./models/recipes.models";
import {UnavailableData} from "../../shared/directives/unavailable.directive";

export interface CommonState{
  recipes: recipes.State,
}

export const reducers: ActionReducerMap<CommonState> = {
  recipes: recipes.reducer,
};

export const selectCommonState = createFeatureSelector<CommonState>('common');

/*-------------------------------------------------RECIPES-------------------------------------------------*/
export const selectRecipesState = createSelector(
  selectCommonState,
  (state: CommonState) => state.recipes
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

export const selectdeleteRecipePending = createSelector(
  selectRecipesEntities,
  (recipes: any, id: number): boolean => recipes[id].PENDING.DELETE === Pending.Active
);
