import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {HelpersService} from '../../../../services/helpers.service';

import {Recipe} from '../../../../store/models/recipes.models';

import {Subscription} from 'rxjs';

export enum circleColors{
  Proteins = '#00663c',
  Carbos = '#ffb20f',
  Fats = '#dd0000',
}

@Component({
  selector: 'app-recipe-nutritional-value',
  templateUrl: './recipe-nutritional-value.component.html',
  styleUrls: ['./recipe-nutritional-value.component.scss']
})
export class RecipeNutritionalValueComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('proteins') proteins: ElementRef;
  @ViewChild('carbos') carbos: ElementRef;
  @ViewChild('fats') fats: ElementRef;

  @Input() data?: Recipe;

  countedKcal: number = 0;

  form: FormGroup;

  subscription: Subscription[] = [];

  constructor(private fb: FormBuilder, private helpers: HelpersService) { }

  ngOnInit(): void {
    this._createForm();

    this.subscription.push(
      this.form.get('WEIGHT').valueChanges.subscribe(value => {
        if(value) {
          this.countedKcal = this.helpers.countRatio(+value, +this.data.RECIPE_CCAL)
        }else {
          this.countedKcal = 0;
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.data && this.data.RECIPE_CCAL && this.carbos && this.proteins && this.fats) {
      this.proteins.nativeElement.style.backgroundImage = this._createGradient(this.helpers.countPercents(+this.data.RECIPE_PROTEINS, +this.data.RECIPE_CCAL), circleColors.Proteins);
      this.carbos.nativeElement.style.backgroundImage = this._createGradient(this.helpers.countPercents(+this.data.RECIPE_CARBOS, +this.data.RECIPE_CCAL), circleColors.Carbos);
      this.fats.nativeElement.style.backgroundImage = this._createGradient(this.helpers.countPercents(+this.data.RECIPE_FATS, +this.data.RECIPE_CCAL), circleColors.Fats);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  private _createGradient(percent, color){
    if(percent < 50)
      return `linear-gradient(${90 + this.helpers.countDegree(percent, 269 - 90)}deg, transparent 50%, #f5f5f5 50%), linear-gradient(90deg, #f5f5f5 50%, transparent 50%)`;

    if(percent == 50)
      return `linear-gradient(90deg, #f5f5f5 50%, transparent 50%)`;

    if(percent > 50)
      return `linear-gradient(${90 + this.helpers.countDegree((percent - 50), 269 - 90)}deg, transparent 50%, ${color} 50%), linear-gradient(90deg, #f5f5f5 50%, transparent 50%)`;

    if(percent == 100)
      return 'none';
  }

  private _createForm() {
    this.form = this.fb.group({
      WEIGHT: null
    });
  }

}
