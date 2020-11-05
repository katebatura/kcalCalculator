import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Recipe} from '../models/recipes.models';
import {Pending} from '../models';
import {Action, createReducer} from '@ngrx/store';

export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>({
  selectId: (recipe: Recipe) => recipe.RECIPE_ID
});

export interface State extends EntityState<Recipe>{
  pending: {
    addRecipe: Pending
  }
}

export const initialState: State = adapter.getInitialState({
  pending: {
    addRecipe: Pending.None
  }
});

export const recipesReducer = createReducer(
  initialState
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
