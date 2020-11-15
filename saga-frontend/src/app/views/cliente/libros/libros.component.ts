import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-libro",
  templateUrl: "./libros.component.html",
})
export class LibrosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

/*import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import {ColordinamicoDirective} from '../../../colordinamico.directive';
import {CarritoComponent } from '../modulocarrito/modulocarrito.component';


@Component({
  selector: "app-libros",
  templateUrl: "./libros.component.html"
})

export class LibrosComponent implements OnInit {
  @ViewChild(ColordinamicoDirective, {static: true}) eldinamico: ColordinamicoDirective;
  
  constructor(private cfr: ComponentFactoryResolver) {}


  ngOnInit(): void  {
  }
  
  componenteDinamico(mensaje: string) {
    sessionStorage.setItem('mensaje', mensaje );
    let cf = this.cfr.resolveComponentFactory(CarritoComponent);
    let vcr = this.eldinamico.viewContainerRef;
    vcr.createComponent(cf, 0);
  }
}*/


