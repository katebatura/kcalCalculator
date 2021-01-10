import {Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";

import {ComponentModes} from "../../../common/store/models";
import {Store} from "@ngrx/store";
import {CommonState} from "../../../common/store";

import {ConfirmDialogComponent} from "../dialogs/confirm-dialog/confirm-dialog.component";

import {filter} from "rxjs/operators";

import * as _lodash from 'lodash';
const lodash = _lodash;

@Component({
  selector: 'app-save-widget',
  templateUrl: './save-widget.component.html',
  styleUrls: ['./save-widget.component.scss']
})
export class SaveWidgetComponent implements OnInit, OnChanges{

  @Input() data?: any;
  @Input() pending: boolean;
  @Input() mode: number;

  @Output() saveItem: EventEmitter<any> = new EventEmitter();
  @Output() deleteItem: EventEmitter<boolean> = new EventEmitter();

  componentModes = ComponentModes;

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<CommonState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this._createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.form && changes.data && !lodash.isEqual(changes.data.currentValue && changes.data.previousValue))
      this.form.patchValue(changes.data.currentValue, {emitEvent: false});
  }

  private _createForm() {
    this.form = this.fb.group({
      RECIPE_NAME: [null, Validators.required]
    });
  }

  save() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      //this.store.dispatch(InvalidForm());
      return;
    }

    this.saveItem.emit(this.form.value);
  }


  delete() {
    this.dialog.open(ConfirmDialogComponent,{
      data: {
        text : 'Вы уверены, что хотите удалить рецепт?',
        cancelButton: 'отмена',
        confirmButton: 'удалить'
      },
      disableClose: true,
      width: '500px'
    }).afterClosed().pipe(
      filter(result => result)
    ).subscribe(() => this.deleteItem.emit());
  }
}
