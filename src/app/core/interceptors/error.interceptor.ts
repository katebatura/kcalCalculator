import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Store} from "@ngrx/store";

import {NotificationService, NotificationType} from "../services/notifications.service";

import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notify: NotificationService,
              private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error(err) {
          if(err instanceof HttpErrorResponse) {
            if(err.status == 401)
              //this.store.dispatch(Logout());
              console.log('Logout!');
            else if(err.status >= 400 && err.status <= 599) this.notify.makeNotify({message: err.error.message || 'Неизвестная ошибка сервера', type: NotificationType.Error});
            else if(err.status == 0) this.notify.makeNotify({message: 'Время ожидания ответа от сервера истекло', type: NotificationType.Error});
          }
        }
      })
    );
  }
}
