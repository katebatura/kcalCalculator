import {createAction, props} from '@ngrx/store';
import {Recipe} from '../models/recipes.models';

export enum RecipesActionTypes{
  AddRecipe = '[Recipes] Add Recipe',
  RecipeAddedSuccess = '[Recipes] Recipe Added Success',
  RecipeAddedError = '[Recipes] Recipe Added Error',
}

export const AddRecipe = createAction(
  RecipesActionTypes.AddRecipe,
  props<{recipe: Recipe}>()
);

export const RecipeAddedSuccess = createAction(
  RecipesActionTypes.RecipeAddedSuccess,
  props<{recipe: Recipe}>()
);

export const RecipeAddedError = createAction(RecipesActionTypes.RecipeAddedError);
