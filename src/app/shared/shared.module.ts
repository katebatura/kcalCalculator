import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ImageCropperModule} from "ngx-image-cropper";

import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

import {ServiceUnavailableComponent} from "./components/service-unavailable/service-unavailable.component";
import {SaveWidgetComponent} from "./components/save-widget/save-widget.component";
import {ConfirmDialogComponent} from './components/dialogs/confirm-dialog/confirm-dialog.component';

import {BtnLoadDirective} from './directives/btn-load.directive';
import {PreloaderDirective} from './directives/preloader.directive';
import {UnavailableDirective} from "./directives/unavailable.directive";

@NgModule({
  declarations: [
    ServiceUnavailableComponent,
    SaveWidgetComponent,
    ConfirmDialogComponent,

    BtnLoadDirective,
    PreloaderDirective,
    UnavailableDirective,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,

    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    PerfectScrollbarModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,

    SaveWidgetComponent,
    ConfirmDialogComponent,

    BtnLoadDirective,
    PreloaderDirective,
    UnavailableDirective,
  ]
})
export class SharedModule{}
