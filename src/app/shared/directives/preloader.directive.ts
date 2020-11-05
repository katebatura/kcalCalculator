import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appPreloader]'
})
export class PreloaderDirective implements OnChanges{
  @Input('appPreloader') preloaderStatus: boolean;
  @Input('preloaderSize') size: number = 130;

  preloaderElement: any;
  imageElement: any;

  displayStarting: string;

  constructor(public el: ElementRef) {
    this.displayStarting = this.el.nativeElement.style.display;

    this.imageElement = document.createElement('img');
    this.imageElement.setAttribute('src', 'assets/images/loader.svg');

    this.preloaderElement = document.createElement('div');
    this.preloaderElement.className = 'loader';
    this.preloaderElement.style.alignItems = 'center';
    this.preloaderElement.style.display = 'flex';
    this.preloaderElement.style.height = '300px';
    this.preloaderElement.style.justifyContent = 'center';
    this.preloaderElement.style.opacity = 0;
    this.preloaderElement.style.transition = 'opacity .3s';
    this.preloaderElement.appendChild(this.imageElement);

    this.el.nativeElement.parentNode.insertBefore(this.preloaderElement, this.el.nativeElement.nextSibling);
  }

  ngOnChanges(changes: SimpleChanges){
    this.imageElement.style.width = this.size + 'px';

    if(changes.preloaderStatus){
      if(this.preloaderStatus){
        this.el.nativeElement.style.display = 'none';
        this.preloaderElement.style.display = 'flex';
        this.preloaderElement.style.opacity = 1;
      }else{
        this.el.nativeElement.style.display = this.displayStarting;
        this.preloaderElement.style.display = 'none';
        this.preloaderElement.style.opacity = 0;
      }
    }
  }
}
