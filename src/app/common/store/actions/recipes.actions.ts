import {createAction, props} from '@ngrx/store';

import {Recipe} from '../models/recipes.models';

export enum RecipesActionTypes{
  LoadRecipes = '[Recipes] Load Recipes',
  RecipesLoadedSuccess = '[Recipes] Recipes Loaded Success',
  RecipesAlreadyLoaded = '[Recipes] Recipes Already Loaded',
  RecipesLoadedError = '[Recipes] Recipes Loaded Error',

  LoadRecipe = '[Recipes] Load Recipes',
  RecipeLoadedSuccess = '[Recipes] Recipe Loaded Success',
  RecipeAlreadyLoaded = '[Recipes] Recipe Already Loaded',
  RecipeLoadedError = '[Recipes] Recipe Loaded Error',

  AddRecipe = '[Recipes] Add Recipe',
  RecipeAddedSuccess = '[Recipes] Recipe Added Success',
  RecipeAddedError = '[Recipes] Recipe Added Error',

  UpdateRecipe = '[Recipes] Update Recipe',
  RecipeUpdatedSuccess = '[Recipes] Recipe Updated Success',
  RecipeUpdatedError = '[Recipes] Recipe Updated Error',

  DeleteRecipe = '[Recipes] Delete Recipe',
  RecipeDeletedSuccess = '[Recipes] Recipe Deleted Success',
  RecipeDeletedError = '[Recipes] Recipe Deleted Error',
}

/**
 * Загрузка списка рецептов
 */
export const LoadRecipes = createAction(
  RecipesActionTypes.LoadRecipes,
  props<{refresh?: boolean}>()
);

export const RecipesLoadedSuccess = createAction(
  RecipesActionTypes.RecipesLoadedSuccess,
  props<{recipes: Recipe[]}>()
);

export const RecipesAlreadyLoaded = createAction(RecipesActionTypes.RecipesAlreadyLoaded);
export const RecipesLoadedError = createAction(RecipesActionTypes.RecipesLoadedError);

/**
 * Загрузка рецепта
 */
export const LoadRecipe = createAction(
  RecipesActionTypes.LoadRecipe,
  props<{id: number, refresh?: boolean}>()
);

export const RecipeLoadedSuccess = createAction(
  RecipesActionTypes.RecipeLoadedSuccess,
  props<{recipe: Recipe}>()
);

export const RecipeAlreadyLoaded = createAction(
  RecipesActionTypes.RecipeAlreadyLoaded,
  props<{recipe: Recipe}>()
);
export const RecipeLoadedError = createAction(RecipesActionTypes.RecipeLoadedError);

/**
 * Добавление рецепта
 */
export const AddRecipe = createAction(
  RecipesActionTypes.AddRecipe,
  props<{recipe: Recipe}>()
);

export const RecipeAddedSuccess = createAction(
  RecipesActionTypes.RecipeAddedSuccess,
  props<{recipe: Recipe}>()
);

export const RecipeAddedError = createAction(RecipesActionTypes.RecipeAddedError);

/**
 * Изменение рецепта
 */
export const UpdateRecipe = createAction(
  RecipesActionTypes.UpdateRecipe,
  props<{recipe: Recipe}>()
);

export const RecipeUpdatedSuccess = createAction(
  RecipesActionTypes.RecipeUpdatedSuccess,
  props<{recipe: Recipe}>()
);

export const RecipeUpdatedError = createAction(RecipesActionTypes.RecipeUpdatedError);

/**
 * Удаление рецепта
 */
export const DeleteRecipe = createAction(
  RecipesActionTypes.DeleteRecipe,
  props<{id: number}>()
);

export const RecipeDeletedSuccess = createAction(
  RecipesActionTypes.RecipeDeletedSuccess,
  props<{id: number}>()
);

export const RecipeDeletedError = createAction(
  RecipesActionTypes.RecipeDeletedError,
  props<{id: number}>()
);
