import {Component, ElementRef} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'service-unavailable',
  templateUrl: './service-unavailable.component.html',
  styleUrls: ['./service-unavailable.component.scss']
})
export class ServiceUnavailableComponent{
  pending: boolean;
  refresh$: Subject<boolean> = new Subject();

  get smallSize(){
    return this.el.nativeElement.firstChild && this.el.nativeElement.firstChild.clientWidth < 700;
  }

  constructor(private el: ElementRef){}

  refresh(): void {
    this.refresh$.next(true);
  }
}
