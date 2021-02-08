import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorInterceptor} from "./interceptors/error.interceptor";

@NgModule({
  declarations: [],
  imports: []
})
export class CoreModule{
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide:HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }
      ]
    }
  }
}
