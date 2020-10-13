import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SimpleNotificationsModule} from 'angular2-notifications';

import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {CalculatorModule} from './calculator/calculator.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),

    SimpleNotificationsModule.forRoot(),

    AppRoutingModule,
    SharedModule,
    AuthModule,
    CalculatorModule,

    CoreModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{}
