import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
})
export class CarritoComponent implements OnInit {
  tokenUser:string;
  tokenRol:number;

  constructor(private router:Router) {
    this.tokenUser = localStorage.getItem('tokenUser');
    this.tokenRol = parseInt(localStorage.getItem('tokenRol'), 10);
  }

  ngOnInit() {
    this.autenticacion();
  }

  autenticacion(){
    if(this.tokenRol != 2){
      this.router.navigate(['/error404']);
    }
  }

  prestamorealizado(){
    swal.fire({
      title: '¿Estás seguro de tu préstamo?',
      text: "Aún puedes agregar más libros a tu lista",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#E53E3E',
      cancelButtonColor: '#1A202C',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Finalizar Préstamo',
    }).then((result) => {
      if (result.isConfirmed) {
        swal.fire(
          '¡Tu préstamo se ha realizado con éxito!',
          'SAGA',
          'success'
        )
      }
    })
  }
}
