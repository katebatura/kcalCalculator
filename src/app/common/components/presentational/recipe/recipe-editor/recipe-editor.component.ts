import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ComponentModes} from "../../../../store/models";
import {Recipe} from "../../../../store/models/recipes.models";
import {Store} from "@ngrx/store";
import {CommonState} from "../../../../store";
import {NotificationService, NotificationType} from "../../../../../core/services/notifications.service";

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss']
})
export class RecipeEditorComponent implements OnInit {

  @Input() data?: Recipe;
  @Input() mode: number;

  componentModes = ComponentModes;

  form: FormGroup;
  addProductForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<CommonState>, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm() {
    this.form = this.fb.group({
      TABLEWARE_WEIGHT: [null, [Validators.required]],
      TABLEWARE: [null],
      DISH_WEIGHT: [null, [Validators.required]],
      PRODUCTS: this.fb.array([])
    });

    this.addProductForm = this.fb.group({
      ADD_PRODUCT_NAME: [null, [Validators.required]],
      ADD_PRODUCT_PROTEINS: [null, [Validators.required]],
      ADD_PRODUCT_FATS: [null, [Validators.required]],
      ADD_PRODUCT_CARBO: [null, [Validators.required]],
      ADD_PRODUCT_WEIGHT: [null, [Validators.required]],
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
      PRODUCT_CARBO: this.addProductForm.value.ADD_PRODUCT_CARBO,
      PRODUCT_WEIGHT: this.addProductForm.value.ADD_PRODUCT_WEIGHT,
    }));

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
  }

}
