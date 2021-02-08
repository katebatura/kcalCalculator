import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";

import {CommonAppState} from "../../../../store";

import {ComponentModes} from "../../../../store/models";
import {Recipe} from "../../../../store/models/recipes.models";

import {NotificationService, NotificationType} from "../../../../../core/services/notifications.service";
import {HelpersService} from "../../../../services/helpers.service";

import {Subscription} from "rxjs";

import * as _lodash from 'lodash';
const lodash = _lodash;

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss']
})
export class RecipeEditorComponent implements OnInit, OnChanges, OnDestroy {

  @Input() data?: Recipe;
  @Input() pending: boolean;
  @Input() mode: number;

  @Output() calculateRecipe: EventEmitter<any> = new EventEmitter<any>();

  componentModes = ComponentModes;

  form: FormGroup;
  addProductForm: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<CommonAppState>,
    private notificationService: NotificationService,
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    this._createForm();

    this.subscriptions.push(
      this.form.get('BY_PRODUCTS_WEIGHT').valueChanges.subscribe((value: boolean) => {
        if(value) {
          this.form.get('TABLEWARE_WEIGHT').clearValidators();
          this.form.get('DISH_WEIGHT').clearValidators();
        } else {
          this.form.get('TABLEWARE_WEIGHT').setValidators([Validators.required]);
          this.form.get('DISH_WEIGHT').setValidators([Validators.required]);
        }

        this.form.get('TABLEWARE_WEIGHT').updateValueAndValidity();
        this.form.get('DISH_WEIGHT').updateValueAndValidity();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.form && changes.data && !lodash.isEqual(changes.data.currentValue && changes.data.previousValue)){
      this.form.patchValue(changes.data.currentValue, {emitEvent: false});

      if(this.products.length)
        this.products.controls.forEach((group, index) => {
          this.form.get(`PRODUCTS.${index}.PRODUCT_WEIGHT`).setValidators([Validators.required]);

          this.subscriptions.push(
            this.form.get(`PRODUCTS.${index}.PRODUCT_WEIGHT`).valueChanges.subscribe((value: string) =>
              this.form.get(`PRODUCTS.${index}`).patchValue({
                PRODUCT_KCAL: this.helpers.countRatio(+value, +this.form.value.PRODUCTS[index].PRODUCT_DEFAULT_KCAL)
              }, {emitEvent: false}))
          );
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private _createForm() {
    this.form = this.fb.group({
      TABLEWARE_WEIGHT: [null, [Validators.required]],
      TABLEWARE: [null],
      DISH_WEIGHT: [null, [Validators.required]],
      PRODUCTS: this.fb.array([]),
      BY_PRODUCTS_WEIGHT: false,
    });

    this.addProductForm = this.fb.group({
      ADD_PRODUCT_NAME: [null, [Validators.required]],
      ADD_PRODUCT_PROTEINS: [null, [Validators.required]],
      ADD_PRODUCT_FATS: [null, [Validators.required]],
      ADD_PRODUCT_CARBOS: [null, [Validators.required]],
      ADD_PRODUCT_WEIGHT: [null],
      ADD_PRODUCT_KCAL: [null, [Validators.required]],
    });
  }

  get products() {
    return this.form.get('PRODUCTS') as FormArray;
  }

  addProduct() {
    if(this.addProductForm.invalid){
      this.addProductForm.markAllAsTouched();
      return;
    }

    this.products.push(this.fb.group({
      PRODUCT_NAME: this.addProductForm.value.ADD_PRODUCT_NAME,
      PRODUCT_PROTEINS: this.addProductForm.value.ADD_PRODUCT_PROTEINS,
      PRODUCT_FATS: this.addProductForm.value.ADD_PRODUCT_FATS,
      PRODUCT_CARBOS: this.addProductForm.value.ADD_PRODUCT_CARBOS,
      PRODUCT_WEIGHT: [this.addProductForm.value.ADD_PRODUCT_WEIGHT || 100, [Validators.required]],
      PRODUCT_DEFAULT_KCAL: this.addProductForm.value.ADD_PRODUCT_KCAL,
      PRODUCT_KCAL: this.addProductForm.value.ADD_PRODUCT_KCAL,
    }));

    let index = this.products.length - 1;

    this.subscriptions.push(
      this.form.get(`PRODUCTS.${index}.PRODUCT_WEIGHT`).valueChanges.subscribe((value: string) =>
        this.form.get(`PRODUCTS.${index}`).patchValue({
          PRODUCT_KCAL: this.helpers.countRatio(+value, +this.form.value.PRODUCTS[index].PRODUCT_DEFAULT_KCAL)
        }, {emitEvent: false}))
    );

    this.addProductForm.reset();
  }

  deleteProduct(index) {
    this.products.controls = this.products.controls.filter((item, i) => i !== index);
  }

  calculate(){
    if(this.form.invalid || !this.products.length){
      this.form.markAllAsTouched();

      if(!this.products.length){
        this.addProductForm.markAllAsTouched();
        this.notificationService.makeNotify({message: 'Не добавлено ни одного ингредиента.', type: NotificationType.Error});
      }

      return;
    }

    this.calculateRecipe.emit({...this.form.value});
  }

}
