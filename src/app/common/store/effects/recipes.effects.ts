import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {select, Store} from "@ngrx/store";

import {CommonState, selectRecipe, selectRecipes} from "../index";

import {
  RecipeAddedError,
  RecipeAddedSuccess,
  RecipeAlreadyLoaded,
  RecipeDeletedError,
  RecipeDeletedSuccess,
  RecipeLoadedError,
  RecipeLoadedSuccess,
  RecipesActionTypes,
  RecipesAlreadyLoaded,
  RecipesLoadedError,
  RecipesLoadedSuccess,
  RecipeUpdatedError,
  RecipeUpdatedSuccess
} from "../actions/recipes.actions";

import {RecipesService} from "../../services/recipes.service";
import {NotificationService, NotificationType} from "../../../core/services/notifications.service";

import {DEFAULT_RECIPE_PENDING, Recipe} from "../models/recipes.models";

import {catchError, map, mergeMap, take, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class RecipesEffects {

  /**
   * Загрузка списка рецептов
   */
  loadRecipes$ = createEffect(() => this.actions$
    .pipe(
      ofType(RecipesActionTypes.LoadRecipes),
      mergeMap((action: any) => {
        let newRecipesList = this.recipesService.loadRecipes().pipe(
          map((recipes: Recipe[]) =>
            RecipesLoadedSuccess({recipes: recipes.map((recipe: Recipe) => ({...recipe, PENDING: DEFAULT_RECIPE_PENDING}))})),
          catchError(() => of(RecipesLoadedError()))
        );

        if(action.refresh)
          return newRecipesList;
        else return this.store.pipe(
          select(selectRecipes),
          take(1),
          mergeMap((recipes: Recipe[]) => {
            if(recipes.length)
              return of(RecipesAlreadyLoaded());
            else return newRecipesList;
          })
        )
      })
    ));

  /**
   * Загрузка рецепта
   */
  loadRecipe$ = createEffect(() => this.actions$
    .pipe(
      ofType(RecipesActionTypes.LoadRecipe),
      mergeMap((action: any) => {
        let recipeInfo = this.recipesService.loadRecipe(action.id).pipe(
          map((recipe: Recipe) => RecipeLoadedSuccess({recipe})),
          catchError(() => of(RecipeLoadedError()))
        );

        if(action.refresh)
          return recipeInfo;
        else return this.store.pipe(
          select(selectRecipe, action.id),
          take(1),
          mergeMap((recipe: Recipe) => {
            if(recipe?.CCAL)
              return of(RecipeAlreadyLoaded({recipe}));
            else return recipeInfo;
          })
        )
      })
    ));

  /**
   * Добавление рецепта
   */
  addRecipe$ = createEffect(() => this.actions$
    .pipe(
      ofType(RecipesActionTypes.AddRecipe),
      mergeMap((action: any) => this.recipesService.addRecipe(action.recipe).pipe(
        map((recipe: Recipe) => {
          this.router.navigateByUrl('/recipe/edit/' + recipe.RECIPE_ID)
            .then(() => this.notificationService.makeNotify({message: 'Рецепт успешно создан.', type: NotificationType.Success}));

          return RecipeAddedSuccess({recipe});
        }),
        catchError(() => of(RecipeAddedError()))
      ))
    ));

  /**
   * Изменение рецепта
   */
  updateRecipe$ = createEffect(() => this.actions$
    .pipe(
      ofType(RecipesActionTypes.UpdateRecipe),
      mergeMap((action: any) => this.recipesService.updateRecipe(action.recipe).pipe(
        map((recipe: Recipe) => {
          this.notificationService.makeNotify({message: 'Рецепт успешно обновлен.', type: NotificationType.Success});

          return RecipeUpdatedSuccess({recipe});
        }),
        catchError(() => of(RecipeUpdatedError()))
      ))
    ));

  /**
   * Удаление рецепта
   */
  deleteRecipe$ = createEffect(() => this.actions$
    .pipe(
      ofType(RecipesActionTypes.DeleteRecipe),
      tap(() => this.notificationService.makeNotify({type: NotificationType.Wait})),
      mergeMap((action: any) => this.recipesService.deleteRecipe(action.id).pipe(
        map(() => {
          this.notificationService.makeNotify({message: 'Рецепт удален.', type: NotificationType.Success});

          return RecipeDeletedSuccess({id: action.id});
        }),
        catchError(() => of(RecipeDeletedError({id: action.id})))
      ))
    ));

  constructor(
    private actions$: Actions,
    private store: Store<CommonState>,
    private router: Router,
    private notificationService: NotificationService,
    private recipesService: RecipesService
  ) {}
}
