import {NgModule} from '@angular/core';

import {CommonRoutingModule} from './common-routing.module';
import {SharedModule} from '../shared/shared.module';

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

    SharedModule
  ],
  exports: [],
  providers: []
})
export class CommonModule{}
