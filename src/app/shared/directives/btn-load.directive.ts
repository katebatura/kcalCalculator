import {AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[btnLoad]'
})
export class BtnLoadDirective implements OnChanges, AfterViewInit{
  @Input('btnLoad') preloader: boolean;

  isDisabled: boolean;
  loader: HTMLElement;
  textElement: HTMLElement;

  viewInit: boolean = false;

  constructor(public el: ElementRef) {
    this.textElement = document.createElement('span');

    this.loader = document.createElement('img');
    this.loader.setAttribute('src', 'assets/images/loader.svg');
    this.loader.classList.add("button-loader");
  }

  ngAfterViewInit() {
    this.textElement.textContent = this.el.nativeElement.textContent;
    this.el.nativeElement.textContent = null;
    this.el.nativeElement.appendChild(this.textElement);

    this._toggleLoader(this.preloader);

    this.viewInit = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.preloader && this.viewInit)
      this._toggleLoader(changes.preloader.currentValue);
  }

  private _toggleLoader(value: boolean){
    if(value){
      this.isDisabled = this.el.nativeElement.disabled;
      this.textElement.classList.add('hidden');
      this.el.nativeElement.appendChild(this.loader);
      this.el.nativeElement.disabled = true;
    } else {
      this.loader.remove();
      this.el.nativeElement.disabled = false;
      this.isDisabled = false;
      this.textElement.classList.remove('hidden');

      if(this.isDisabled !== undefined)
        this.el.nativeElement.disabled = this.isDisabled;
    }
  }

}
