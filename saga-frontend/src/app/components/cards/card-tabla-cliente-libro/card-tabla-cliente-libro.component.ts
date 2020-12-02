import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
//import {PopupCliente} from "src/app/views/cliente/pupupcliente/popupcliente.component";
import {CardPopupCliente} from "./../card-popup-cliente/card-popup-cliente.component";


@Component({
  selector: "app-card-tabla-cliente-libro",
  templateUrl: "./card-tabla-cliente-libro.component.html"
})
export class CardTablaLibroClienteComponent implements OnInit {
 
  constructor(private service: SharedService, private dialog: MatDialog ) {}

    LibroList:any=[];
    MostrarComponente:boolean=false;
    libro:any;
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

    ngOnInit(): void {
      this.refreshLibroList();
    }

    refreshLibroList(){
      this.service.getLibroList().subscribe(data=>{
        this.LibroList=data;
      });
    }

    Crear(dataItem){
      this.service.getLibroList().subscribe(data=>{
        console.log(this.libro);
        this.libro=data;
        this.idLibro=this.libro.idLibro;
       this.titulo=this.libro.titulo;
       this.descripcion=this.libro.descripcion;
      });
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {  
        IdLibro: dataItem.idLibro  
    };
      this.dialog.open(CardPopupCliente, dialogConfig);
    }
    
}
 