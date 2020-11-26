import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';

import * as recipeActions from '../actions/recipes.actions';

import {Recipe} from '../models/recipes.models';
import {Pending} from '../models';

export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>({
  selectId: (recipe: Recipe) => recipe.RECIPE_ID
});

export interface State extends EntityState<Recipe>{
  pending: {
    getAll: Pending,
    getOne: Pending,
    addRecipe: Pending,
    updateRecipe: Pending,
  }
}

export const initialState: State = adapter.getInitialState({
  pending: {
    getAll: Pending.None,
    getOne: Pending.None,
    addRecipe: Pending.None,
    updateRecipe: Pending.None,
  }
});

export const recipesReducer = createReducer(
  initialState,

  /**
   * Загрузка списка рецептов
   */
  on(recipeActions.LoadRecipes, state => ({
    ...state,
    pending: {...state.pending, getAll: state.pending.getAll === Pending.Error ? Pending.ErrorPending : Pending.Active}
  })),
  on(recipeActions.RecipesLoadedSuccess, (state, action: any) => adapter.upsertMany(action.recipes, {
    ...state,
    pending: {...state.pending, getAll: Pending.None}
  })),
  on(recipeActions.RecipesAlreadyLoaded, state => ({
    ...state,
    pending: {...state.pending, getAll: Pending.None}
  })),
  on(recipeActions.RecipesLoadedError, state => ({
    ...state,
    pending: {...state.pending, getAll: Pending.Error}
  })),

  /**
   * Загрузка рецепта
   */
  on(recipeActions.LoadRecipe, state => ({
    ...state,
    pending: {...state.pending, getOne: state.pending.getOne === Pending.Error ? Pending.ErrorPending : Pending.Active}
  })),
  on(recipeActions.RecipeLoadedSuccess, (state, action: any) => adapter.updateOne({
    id: action.recipe.RECIPE_ID,
    changes: action.recipe
  }, {
    ...state,
    pending: {...state.pending, getOne: Pending.None}
  })),
  on(recipeActions.RecipeAlreadyLoaded, state => ({
    ...state,
    pending: {...state.pending, getOne: Pending.None}
  })),
  on(recipeActions.RecipeLoadedError, state => ({
    ...state,
    pending: {...state.pending, getOne: Pending.Error}
  })),

  /**
   * Добавление рецепта
   */
  on(recipeActions.AddRecipe, state => ({
    ...state,
    pending: {...state.pending, addRecipe: Pending.Active}
  })),
  on(recipeActions.RecipeAddedSuccess, (state, action: any) => adapter.addOne(action.recipe, {
    ...state,
    pending: {...state.pending, addRecipe: Pending.None}
  })),
  on(recipeActions.RecipeAddedError, state => ({
    ...state,
    pending: {...state.pending, addRecipe: Pending.None}
  })),

  /**
   * Изменение рецепта
   */
  on(recipeActions.UpdateRecipe, state => ({
    ...state,
    pending: {...state.pending, updateRecipe: Pending.Active}
  })),
  on(recipeActions.RecipeUpdatedSuccess, (state, action: any) => adapter.updateOne({
    id: action.recipe.RECIPE_ID,
    changes: action.recipe
  }, {
    ...state,
    pending: {...state.pending, updateRecipe: Pending.None}
  })),
  on(recipeActions.RecipeUpdatedError, state => ({
    ...state,
    pending: {...state.pending, updateRecipe: Pending.None}
  })),

  /**
   * Удаление рецепта
   */
  on(recipeActions.DeleteRecipe, (state, action: any) => adapter.updateOne({
    id: action.id,
    changes: {
      PENDING: {
        ...state.entities[action.id].PENDING,
        DELETE: Pending.Active
      }
    }
  }, state)),
  on(recipeActions.RecipeDeletedSuccess, (state, action: any) => adapter.removeOne(action.id, state)),
  on(recipeActions.RecipeDeletedError, (state, action: any) => adapter.updateOne({
    id: action.id,
    changes: {
      PENDING: {
        ...state.entities[action.id].PENDING,
        DELETE: Pending.None
      }
    }
  }, state)),
);

export function reducer(state: State | undefined, action: Action) {
  return recipesReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectRecipesIds = selectIds;
export const selectRecipesEntities = selectEntities;
export const selectAllRecipes = selectAll;
export const selectRecipesTotal = selectTotal;
