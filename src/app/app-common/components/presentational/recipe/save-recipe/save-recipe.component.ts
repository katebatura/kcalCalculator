import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'save-recipe',
  templateUrl: './save-recipe.component.html',
  styleUrls: ['./save-recipe.component.scss']
})
export class SaveRecipeComponent implements OnInit {
  recipeID: number;

  form: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.recipeID = route.snapshot.params.id;

    this._createForm();
  }

  ngOnInit(): void {
  }

  private _createForm() {
    this.form = this.fb.group({
      NAME: [null, Validators.required]
    });
  }

  save() {
    console.log('save');
  }
}
