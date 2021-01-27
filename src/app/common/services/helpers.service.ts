import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  countRatio(weight: number, defaultValue: number) {
    return +(weight * defaultValue / 100).toFixed(2);
  }

  countInverseRatio(weight: number, totalValue: number) {
    return +(100 * totalValue / weight).toFixed(2);
  }

  countPercents(weight: number, totalValue: number) {
    return Math.round(weight * 100 / totalValue);
  }

  countDegree(percent, deg) {
    return Math.round(percent * deg / 49)
  }
}
