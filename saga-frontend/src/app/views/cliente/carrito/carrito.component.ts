import { Component, OnInit } from "@angular/core";
import swal from'sweetalert2';


@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
})
export class CarritoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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
