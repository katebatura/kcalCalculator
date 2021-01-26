import {Component, OnInit, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {
  CommonState,
  selectAddRecipePending,
  selectLoadRecipePending,
  selectUpdateRecipePending
} from "../../../store";
import {
  AddRecipe,
  DeleteRecipe,
  LoadRecipe, LoadRecipes, RecipeAlreadyLoaded,
  RecipeLoadedSuccess,
  UpdateRecipe
} from "../../../store/actions/recipes.actions";

import {ComponentModes} from "../../../store/models";
import {Product, Recipe} from '../../../store/models/recipes.models';

import {HelpersService} from '../../../services/helpers.service';

import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy{

  addRecipePending$: Observable<boolean> = this.store.pipe(select(selectAddRecipePending));
  updateRecipePending$: Observable<boolean> = this.store.pipe(select(selectUpdateRecipePending));
  loadRecipePending$: Observable<boolean> = this.store.pipe(select(selectLoadRecipePending));

  componentMode: number;

  componentModes = ComponentModes;

  form: FormGroup;

  calculatePending: boolean;

  subscription: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private actions$: Actions,
    private store: Store<CommonState>,
    private helpers: HelpersService
  ) {}

  ngOnInit(): void {
    this.componentMode = this.route.snapshot.params.id ? ComponentModes.Edit : ComponentModes.Create;

    this._createForm();

    this.subscription.push(
      this.actions$.pipe(ofType(RecipeLoadedSuccess, RecipeAlreadyLoaded)).subscribe(action => {
        this.form.patchValue(action.recipe);

        action.recipe.PRODUCTS?.forEach((item: Product, index) => this.products.push(this.fb.group({
            PRODUCT_NAME: action.recipe.PRODUCTS[index].PRODUCT_NAME,
            PRODUCT_PROTEINS: action.recipe.PRODUCTS[index].PRODUCT_PROTEINS,
            PRODUCT_FATS: action.recipe.PRODUCTS[index].PRODUCT_FATS,
            PRODUCT_CARBOS: action.recipe.PRODUCTS[index].PRODUCT_CARBOS,
            PRODUCT_WEIGHT: [action.recipe.PRODUCTS[index].PRODUCT_WEIGHT, [Validators.required]],
            PRODUCT_DEFAULT_KCAL: action.recipe.PRODUCTS[index].PRODUCT_KCAL,
            PRODUCT_KCAL: action.recipe.PRODUCTS[index].PRODUCT_KCAL,
          }
        )));
      })
    );

    this.store.dispatch(LoadRecipes({refresh: false}));

    if(this.componentMode === ComponentModes.Edit)
      this.store.dispatch(LoadRecipe({id: this.route.snapshot.params.id}));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  private _createForm() {
    this.form = this.fb.group({
      RECIPE_ID: [null],
      RECIPE_NAME: [null, Validators.required],
      RECIPE_CCAL: [null, Validators.required],
      RECIPE_PROTEINS: [null, Validators.required],
      RECIPE_FATS: [null, Validators.required],
      RECIPE_CARBOS: [null, Validators.required],
      PRODUCTS: this.fb.array([])
    });
  }

  get products() {
    return this.form.get('PRODUCTS') as FormArray;
  }

  calculateRecipe(recipe: any) {
    this.calculatePending = true;

    recipe.PRODUCTS?.forEach((item: Product, index) => this.products.push(this.fb.group({
        PRODUCT_NAME: recipe.PRODUCTS[index].PRODUCT_NAME,
        PRODUCT_PROTEINS: recipe.PRODUCTS[index].PRODUCT_PROTEINS,
        PRODUCT_FATS: recipe.PRODUCTS[index].PRODUCT_FATS,
        PRODUCT_CARBOS: recipe.PRODUCTS[index].PRODUCT_CARBOS,
        PRODUCT_WEIGHT: [recipe.PRODUCTS[index].PRODUCT_WEIGHT, [Validators.required]],
        PRODUCT_DEFAULT_KCAL: recipe.PRODUCTS[index].PRODUCT_KCAL,
        PRODUCT_KCAL: recipe.PRODUCTS[index].PRODUCT_KCAL,
      }
    )));

    const weight = !recipe.BY_PRODUCTS_WEIGHT ? (+recipe.DISH_WEIGHT - +recipe.TABLEWARE_WEIGHT) : this.products.controls.reduce((accumulator, currentValue) => accumulator + +currentValue.value.PRODUCT_WEIGHT, 0),
      totalKCal = this.products.controls.reduce((accumulator, currentValue) => accumulator + +currentValue.value.PRODUCT_KCAL, 0),
      totalProteins = this.products.controls.reduce((accumulator, currentValue) => accumulator + +currentValue.value.PRODUCT_PROTEINS, 0),
      totalFats = this.products.controls.reduce((accumulator, currentValue) => accumulator + +currentValue.value.PRODUCT_FATS, 0),
      totalCarbos = this.products.controls.reduce((accumulator, currentValue) => accumulator + +currentValue.value.PRODUCT_CARBOS, 0);

    this.form.patchValue({
      RECIPE_CCAL: this.helpers.countInverseRatio(weight, totalKCal),
      RECIPE_PROTEINS: this.helpers.countInverseRatio(weight, totalProteins),
      RECIPE_FATS: this.helpers.countInverseRatio(weight, totalFats),
      RECIPE_CARBOS: this.helpers.countInverseRatio(weight, totalCarbos),
    });

    this.calculatePending = false;
  }

  saveRecipe(ev: any) {
    this.form.patchValue(ev);

    if(this.componentMode === ComponentModes.Create)
      this.store.dispatch(AddRecipe({recipe: {...this.form.value, ...ev}}));
    else this.store.dispatch(UpdateRecipe({recipe: {...this.form.value, ...ev}}));
  }

  deleteRecipe() {
    this.store.dispatch(DeleteRecipe({id: this.form.value.RECIPE_ID}));
  }
}
