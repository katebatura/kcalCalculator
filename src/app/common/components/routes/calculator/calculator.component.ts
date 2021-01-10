import {Component, OnInit, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {
  CommonState,
  selectAddRecipePending,
  selectLoadRecipePending,
  selectRecipe,
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
import {Recipe} from "../../../store/models/recipes.models";

import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy{

  recipe$: Observable<Recipe>;
  addRecipePending$: Observable<boolean> = this.store.pipe(select(selectAddRecipePending));
  updateRecipePending$: Observable<boolean> = this.store.pipe(select(selectUpdateRecipePending));
  loadRecipePending$: Observable<boolean> = this.store.pipe(select(selectLoadRecipePending));

  componentMode: number;

  componentModes = ComponentModes;

  form: FormGroup;

  subscription: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private actions$: Actions,
    private store: Store<CommonState>
  ) {}

  ngOnInit(): void {
    this.componentMode = this.route.snapshot.params.id ? ComponentModes.Edit : ComponentModes.Create;

    this._createForm();

    this.subscription.push(
      this.actions$.pipe(ofType(RecipeLoadedSuccess, RecipeAlreadyLoaded))
        .subscribe(action => this.form.patchValue(action.recipe)),
    );

    this.store.dispatch(LoadRecipes({refresh: false}));

    if(this.componentMode === ComponentModes.Edit){
      this.recipe$ = this.store.pipe(select(selectRecipe, this.route.snapshot.params.id));
      this.store.dispatch(LoadRecipe({id: this.route.snapshot.params.id}));
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  private _createForm() {
    this.form = this.fb.group({
      RECIPE_ID: [null],
      RECIPE_NAME: [null, Validators.required],
      CCAL: [null, Validators.required]
    });
  }

  saveRecipe(ev: any) {
    if(this.componentMode === ComponentModes.Create)
      this.store.dispatch(AddRecipe({recipe: {...this.form.value, ...ev}}));
    else this.store.dispatch(UpdateRecipe({recipe: {...this.form.value, ...ev}}));
  }

  deleteRecipe() {
    this.store.dispatch(DeleteRecipe({id: this.form.value.RECIPE_ID}));
  }
}
