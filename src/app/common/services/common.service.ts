import {Injectable} from '@angular/core';

import {Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class CommonService {

  constructor() { }

  /**
   * Загрузка меню
   */
  getMenu(): Observable<any> {
    return of([
      {
        LABEL: 'Калькулятор',
        URL: 'recipe/create',
        ICON: 'add'
      },
      {
        LABEL: 'Редактор',
        URL: 'recipe/edit/10',
        ICON: 'add'
      }
    ]);
  }
}
