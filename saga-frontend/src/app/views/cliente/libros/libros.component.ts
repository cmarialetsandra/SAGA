import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import {ColordinamicoDirective} from '../../../colordinamico.directive';
import {CarritoComponent } from '../modulocarrito/modulocarrito.component';


@Component({
  selector: "app-libros",
  templateUrl: "./libros.component.html"
})

export class LibrosComponent implements OnInit {
  @ViewChild(ColordinamicoDirective, {static: true}) eldinamico: ColordinamicoDirective;
  constructor(private cfr: ComponentFactoryResolver) {}
  cbox: boolean;
  ngOnInit() {
    this.cbox = true;
    sessionStorage.setItem('azar', '1');
  }
  cambio(e) {
    this.cbox = e;
    if (e) {
      sessionStorage.setItem('azar', '1');
    } else {
      sessionStorage.setItem('azar', '0');
    }
  }

  componenteDinamico(mensaje: string, color: string) {
    sessionStorage.setItem('mensaje', mensaje);
    sessionStorage.setItem('color', color);
    let cf = this.cfr.resolveComponentFactory(CarritoComponent);
    let vcr = this.eldinamico.viewContainerRef;
    vcr.createComponent(cf, 0);
  }
}


