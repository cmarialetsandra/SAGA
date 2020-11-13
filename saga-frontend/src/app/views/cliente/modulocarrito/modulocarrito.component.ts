import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulocarrito',
  templateUrl: './modulocarrito.component.html',
  styleUrls: ['./modulocarrito.component.css']
})
export class CarritoComponent implements OnInit {
  modulonumero: number;
  constructor() { }
  mensaje: string;
  color: string

  ngOnInit() {

    if (sessionStorage.getItem('mimodulo')) {
      this.modulonumero = + sessionStorage.getItem('mimodulo');
      this.modulonumero ++;
      sessionStorage.setItem('mimodulo', this.modulonumero.toString());
    } else {
      this.modulonumero = 1;
      sessionStorage.setItem('mimodulo', this.modulonumero.toString());
    }
    if (sessionStorage.getItem('mensaje') === '') {
      this.mensaje = 'Hola soy el modulo numero: ' + this.modulonumero.toString();
    } else {
      this.mensaje = sessionStorage.getItem('mensaje');
    }
    if (sessionStorage.getItem('azar') === '1') {
      this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    } else {
      this.color = sessionStorage.getItem('color');
    }
  }

}
