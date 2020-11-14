import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-modulocarrito',
  templateUrl: './modulocarrito.component.html',
  styleUrls: ['./modulocarrito.component.css']
})
export class CarritoComponent implements OnInit {
  constructor(private service: SharedService) { }
  mensaje: string;

  LibroList:any=[];

  ngOnInit() {
    this.mensaje = sessionStorage.getItem('mensaje');
    this.refreshLibroList();
  }

  refreshLibroList(){
    this.service.getLibroList().subscribe(data=>{
      this.LibroList=data;
    });
  }
}
