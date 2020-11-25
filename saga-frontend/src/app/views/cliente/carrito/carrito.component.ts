import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { SharedService } from "src/app/shared.service";
import swal from'sweetalert2';

@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
})
export class CarritoComponent implements OnInit {
  tokenUser:string;
  tokenRol:number;
  LibroList:any=[];
  CarritoList:any=[];
  DetalleList:any=[];

  constructor(private service:SharedService, private router:Router) {
    this.tokenUser = localStorage.getItem('tokenUser');
    this.tokenRol = parseInt(localStorage.getItem('tokenRol'), 10);

    if(localStorage.getItem('carrito')){
      this.CarritoList = JSON.parse(localStorage.getItem('carrito'));
    }
  }

  ngOnInit() {
    this.autenticacion();
    this.refreshLibroList();
  }

  autenticacion(){
    if(this.tokenRol != 2){
      this.router.navigate(['/error404']);
    }
  }

  refreshLibroList(){
    for(let i of this.CarritoList){
      this.service.getLibroIndividual(i.IdLibro).subscribe(data=>{
        this.LibroList = data;
        var val = {
          titulo:this.LibroList.titulo,
          autor:this.LibroList.nombres+ " " + this.LibroList.apellidos,
          categoria:this.LibroList.nombreCategoria,
          cantidad:i.Cantidad
        };
        this.DetalleList.push(val);
      });
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
