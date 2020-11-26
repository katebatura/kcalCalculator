import {
  Directive, ElementRef, ViewContainerRef, TemplateRef, ComponentFactoryResolver,
  EventEmitter, Input, OnChanges, Output, SimpleChanges, OnDestroy
} from '@angular/core';

import {ServiceUnavailableComponent} from "../components/service-unavailable/service-unavailable.component";

import {Subscription} from "rxjs";

import * as _lodash from 'lodash';
const lodash = _lodash;

@Directive({
  selector: '[unavailable]'
})
export class UnavailableDirective implements OnChanges, OnDestroy{
  @Input('unavailable') data: UnavailableData;

  @Output() unavailableRefresh: EventEmitter<boolean> = new EventEmitter();
  @Output() templateRefInit: EventEmitter<boolean> = new EventEmitter();

  unavailableComponentFactory: any;

  subscription: Subscription;

  constructor(
    public el: ElementRef, private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private componentFactoryResolver: ComponentFactoryResolver
  ){
    this.unavailableComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ServiceUnavailableComponent);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.data && !lodash.isEqual(changes.data.previousValue, changes.data.currentValue)){
      this.viewContainerRef.clear();

      if(this.subscription)
        this.subscription.unsubscribe();

      if(this.data.unavailable){
        let unavailableComponentRef = this.viewContainerRef.createComponent(this.unavailableComponentFactory);

        (<ServiceUnavailableComponent>unavailableComponentRef.instance).pending = this.data.pending;
        this.subscription = (<ServiceUnavailableComponent>unavailableComponentRef.instance).refresh$.subscribe(() => this.unavailableRefresh.emit(true));
      }else{
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.templateRefInit.emit(true);
      }
    }
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}

export interface UnavailableData {
  unavailable: boolean,
  pending: boolean
}
