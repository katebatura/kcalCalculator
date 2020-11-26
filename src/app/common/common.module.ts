import {NgModule} from '@angular/core';
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";

import {CommonRoutingModule} from './common-routing.module';
import {SharedModule} from '../shared/shared.module';

import {reducers} from "./store";
import {RecipesEffects} from "./store/effects/recipes.effects";

import {CommonComponent} from './components/common.component';

import {CalculatorComponent} from './components/routes/calculator/calculator.component';

import {RecipeEditorComponent} from './components/presentational/recipe/recipe-editor/recipe-editor.component';
import {SaveRecipeComponent} from './components/presentational/recipe/save-recipe/save-recipe.component';

@NgModule({
  declarations: [
    CommonComponent,

    CalculatorComponent,

    RecipeEditorComponent,
    SaveRecipeComponent,
  ],
  imports: [
    CommonRoutingModule,

    SharedModule,

    EffectsModule.forFeature([
      RecipesEffects
    ]),
    StoreModule.forFeature('common', reducers),
  ],
  exports: [],
  providers: []
})
export class CommonModule{}
