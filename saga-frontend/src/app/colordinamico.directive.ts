import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appColordinamico]'
})
export class ColordinamicoDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
