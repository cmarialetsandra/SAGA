import { Component, OnInit, Input,Inject  } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { MatDialogRef,  MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PopupCliente } from 'src/app/views/cliente/pupupcliente/popupcliente.component';
import swal from'sweetalert2';

@Component({
  selector: "app-card-popup-cliente",
  templateUrl: "./card-popup-cliente.component.html"
})
export class CardPopupCliente implements OnInit {
  LibroList:any=[];
  idLibro:number;
  titulo:string;
  descripcion:string;
  cantidadPaginas:number;
  nombreCategoria:string;
  nombres:string;
  apellidos:string;
  isbn:string;
  anioPublicacion:Date;
  nombre:string;
  CardPopupCliente:CardPopupCliente;
  EjemplarList:any=[];
  Stock:number;
  Cantidad:number;

  constructor(private service: SharedService, public dialogRef: MatDialogRef<PopupCliente>,  @Inject(MAT_DIALOG_DATA) data) {
    this.idLibro = data.IdLibro
  }

  @Input() libro:any = {};
          
  ngOnInit(): void {
    this.service.getLibroList().subscribe(result=>{
      this.CardPopupCliente = result.find(a=>a.idLibro == this.idLibro);
      this.titulo = this.CardPopupCliente.titulo;
      this.descripcion = this.CardPopupCliente.descripcion;
      this.cantidadPaginas = this.CardPopupCliente.cantidadPaginas;
      this.nombreCategoria = this.CardPopupCliente.nombreCategoria;
      this.nombres = this.CardPopupCliente.nombres;
      this.apellidos = this.CardPopupCliente.apellidos;
      this.isbn = this.CardPopupCliente.isbn;
      this.anioPublicacion = this.CardPopupCliente.anioPublicacion;
      this.nombre = this.CardPopupCliente.nombre;
    })

    this.refreshStockList();

    // this.refreshLibroList();      
  }

  refreshLibroList(){
    this.service.getLibroList().subscribe(data=>{
      this.LibroList=data;
    });
  }

  refreshStockList(){
    this.service.getStock(this.idLibro).subscribe(data=>{
      this.EjemplarList=data;
      this.Stock=this.EjemplarList.stock;
    });
  }

  close(){      
      this.dialogRef.close();      
  }

  agregarCarrito(){
    var existencia = this.Stock-this.Cantidad;
    if(this.Stock <= 4){
      this.sinExistencia();
    }else if(existencia < 4){
      this.sinExistencia();     
    }else{
      var val = {
        IdLibro:this.idLibro,
        Cantidad:this.Cantidad
      };
    
      var re1 = /\[/gi;  
      var re2 = /\]/gi;  
      
      if(localStorage.getItem('carrito')==null){
        localStorage.setItem('carrito', "["+JSON.stringify(val)+"]");
      }else{
        var newstr1 = localStorage.getItem('carrito').replace(re1, "");  
        var newstr2 = newstr1.replace(re2, "");  
  
        localStorage.setItem('carrito', "["+newstr2+","+JSON.stringify(val)+"]");
      }
      
      this.close();
      this.prestamo();
    }
  }

  sinExistencia(){
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 7000,
      timerProgressBar: true,
      didOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
  
    Toast.fire({
      icon: 'error',
      title: 'Disponibilidad insuficiente para préstamo'
    })
  }

  prestamo(){
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
  
    Toast.fire({
      icon: 'success',
      title: 'Libro añadido al carrito'
    })
  }
}
