import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {NotificationsService} from 'angular2-notifications';
import {Subscription} from "rxjs";

export enum NotificationType{
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Wait = 'wait',
  Warning = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  clickSubscription: Subscription;

  constructor(private notify: NotificationsService) {}

  makeNotify(data: any){
    let buttons: string = '';
    let icon: string = '';

    switch(data.type){
      case NotificationType.Success: {
        icon = `<span class="bullet ${data.type}">&bull;</span>`;
        break;
      }
      case NotificationType.Error: {
        icon = `<span class="bullet ${data.type}">&bull;</span>`;
        break;
      }
      case NotificationType.Info: {
        icon = `<span class="bullet ${data.type}">&bull;</span>`;
        break;
      }
      case NotificationType.Warning: {
        icon = `<span class="bullet ${data.type}">&bull;</span>`;
        break;
      }
      case NotificationType.Wait: {
        icon = `<img class="mr10" src="assets/images/icon-wait.gif" alt="">`;

        if(!data.message)
          data.message = 'Пожалуйста, подождите...';

        break;
      }
    }

    let delimiter = '';

    if(data.buttons){
      for(let button of data.buttons){
        buttons += `
          <button class="btn-ntf" id="btn-ntf-${button.id}">
            <span class="btn-ntf-icon ${button.icon || ''}"></span>
            ${button.label}
          </button>
        `;
      }

      if(data.buttons.length)
        delimiter = `<div class="btn-ntf-delimiter"></div>`;
    }

    const html = `
      <div class="custom-notification ${data.type}">
        <img src="assets/images/icon-close.svg" alt="" id="DELETE">
        <p>${icon} ${data.message}</p>
        ${delimiter}
        <div class="btn-ntf-wrapper">${buttons}</div>
      </div>
    `;

    const notification = this.notify.html(html, data.type);

    let clickHandler = notification.click.pipe(
      map((e: MouseEvent) => {
        let id;

        if((<HTMLElement>e.target).className.indexOf('btn-ntf-icon') != -1)
          id = (<HTMLElement>e.target).parentElement.id;
        else id = (<HTMLElement>e.target).id;

        if(id){
          if(id == 'DELETE')
            this.removeNotifiers(notification.id);

          return id;
        }
      })
    );

    this.clickSubscription = clickHandler.subscribe();

    return clickHandler;
  }

  removeNotifiers(id: any = null){
    this.notify.remove(id);
    this.clickSubscription && this.clickSubscription.unsubscribe();
  }
}


