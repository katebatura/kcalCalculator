import {Injectable} from '@angular/core';

import {Recipe} from "../store/models/recipes.models";

import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipesService {

  /**
   * Загрузка списка рецептов
   */
  loadRecipes(): Observable<Recipe[]> {
    return of([
      {RECIPE_ID: 1, RECIPE_NAME: '1'},
      {RECIPE_ID: 2, RECIPE_NAME: '2'},
      {RECIPE_ID: 3, RECIPE_NAME: '3'},
    ]);
  }

  /**
   * Загрузка рецепта
   */
  loadRecipe(id: number): Observable<Recipe> {
    return of(
    {RECIPE_ID: 1, RECIPE_NAME: '1', CCAL: 125}
    );
  }

  /**
   * Добавление рецепта
   */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return of(
    {RECIPE_ID: 10, RECIPE_NAME: '10', CCAL: 300}
    );
  }

  /**
   * Изменение рецепта
   */
  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return of(
      {RECIPE_ID: 11, RECIPE_NAME: '11', CCAL: 250}
    );
  }

  /**
   * Удаление рецепта
   */
  deleteRecipe(id: number) {
    return of({message: 'ok'});
  }

  constructor() { }
}
