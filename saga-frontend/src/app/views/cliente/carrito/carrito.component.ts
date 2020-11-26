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
  tokenId:number;
  LibroList:any=[];
  CarritoList:any=[];
  DetalleList:any=[];
  Prestamolist:any=[];
  fechaHoy:string;
  fechaVencimiento:string;

  constructor(private service:SharedService, private router:Router) {
    this.tokenUser = localStorage.getItem('tokenUser');
    this.tokenRol = parseInt(localStorage.getItem('tokenRol'), 10);
    this.tokenId = parseInt(localStorage.getItem('tokenId'), 10);
    this.fechaHoy = (new Date()).toISOString().substring(0,10);

    var fecha = new Date(this.fechaHoy);
    var dias = 15; // Número de días a agregar
    fecha.setDate(fecha.getDate()+ dias);
    this.fechaVencimiento = fecha.toISOString().substring(0,10);

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
          idLibro:this.LibroList.idLibro,
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
        var valP = {
          IdUsuario : this.tokenId,
          FechaEmision : this.fechaHoy,
          FechaVencimiento : this.fechaVencimiento,
          Estado : 0
        };
    
        this.service.addPrestamo(valP).subscribe(res=>{
          this.Prestamolist = res;
          for(let i of this.DetalleList){
            var valDP = {
              Cantidad : i.cantidad,
              IdPrestamo : this.Prestamolist.idPrestamo,
              IdLibro : i.idLibro
            }
            this.service.addDetallePrestamo(valDP).subscribe(res=>{
              this.DetalleList.splice(i,1);
            });
            
          }
          localStorage.removeItem('carrito');
        });

        swal.fire(
          '¡Tu préstamo se ha realizado con éxito!',
          'SAGA',
          'success'
        )
      }
    })
  }

  quitarLibro(id:number){

    swal.fire({
      title: '¿Estás seguro?',
      text: "El libro se eliminará de tu carrito",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44e3c',
      cancelButtonColor: '#a5a5a5',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        for(let i of this.DetalleList){
          if(i.idLibro == id){
            this.DetalleList.splice(i,1);
            this.CarritoList.splice(i,1);
            if(this.CarritoList.length === 0){
              localStorage.removeItem('carrito');
            }else{
              localStorage.setItem('carrito',JSON.stringify(this.CarritoList));
            }            
          }
        } 
        swal.fire(
          'Éxito',
          'El registro fue eliminado',
          'success'
        )
      }
    });   
  }
}
