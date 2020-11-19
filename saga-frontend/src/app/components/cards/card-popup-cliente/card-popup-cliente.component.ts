import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit, Input,Inject  } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { MatDialogRef,  MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PopupCliente } from 'src/app/views/cliente/pupupcliente/popupcliente.component';
  

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

     // this.refreshLibroList();
      
    }

    refreshLibroList(){
      this.service.getLibroList().subscribe(data=>{
        this.LibroList=data;
      });
    }

    close(){
      
        this.dialogRef.close();
      
    }

}
