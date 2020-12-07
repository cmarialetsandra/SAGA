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
    BusquedaLibroList:any=[];
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
    busqueda:number=0;
    textoBusqueda:string;
    vacio:number=1;

    ngOnInit(): void {
      this.refreshLibroList();
    }

    refreshLibroList(){
      this.service.getLibroList().subscribe(data=>{
        this.LibroList=data;
        console.log("Lista libros",this.LibroList);
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

    buscar(){
      var encontrado = 0;
      var llena = 0;

      var str = "    ";
      if (!this.textoBusqueda.replace(/\s/g, '').length) {
        this.busqueda = 0;
        this.vacio = 1;
      }else{
        if(this.BusquedaLibroList.length == 0){
          llena = 0;
        }else{
          llena = 1;
          this.BusquedaLibroList.length = 0;
          this.BusquedaLibroList.splice(0, this.BusquedaLibroList.length);
        }   
  
        for(let libro of this.LibroList){
          if( (libro.anioPublicacion).toString().includes(this.textoBusqueda) ||
          libro.nombres.toUpperCase().includes(this.textoBusqueda.toUpperCase()) ||
          libro.apellidos.toUpperCase().includes(this.textoBusqueda.toUpperCase()) ||
          (libro.nombres + " " + libro.apellidos).toUpperCase().includes(this.textoBusqueda.toUpperCase()) ||
          (libro.cantidadPaginas).toString().includes(this.textoBusqueda) ||
          libro.descripcion.toUpperCase().includes(this.textoBusqueda.toUpperCase()) ||
          libro.isbn.toUpperCase().includes(this.textoBusqueda.toUpperCase()) ||
          libro.nombre.toUpperCase().includes(this.textoBusqueda.toUpperCase()) ||
          libro.nombreCategoria.toUpperCase().includes(this.textoBusqueda.toUpperCase()) ||
          libro.titulo.toUpperCase().includes(this.textoBusqueda.toUpperCase())){
            encontrado = 1;
            this.BusquedaLibroList.push(libro);
          }else{
            encontrado = 0;
          }
        }

        if(this.textoBusqueda.length != 0 && this.BusquedaLibroList.length == 0){
          this.vacio = 0;
        }else if(this.BusquedaLibroList.length == 0){
          this.busqueda = 0;
          this.vacio = 1;
        }else{
          this.busqueda = 1;
          this.vacio = 1;
        }
      }
    }
    
}
 