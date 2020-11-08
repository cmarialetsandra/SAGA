import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-card-agregar-entradacategoria",
  templateUrl: "./card-agregar-entradacategoria.component.html",
})
export class CardAgregarEntradaCategoriaComponent implements OnInit {
  constructor(private service:SharedService, private router:Router) {}

  @Input() cat: any;
  NombreCategoria:string;

  ngOnInit(): void {
  }

  addCategoria(){
    var val = {
      NombreCategoria:this.NombreCategoria
    };
    
    this.service.addCategoria(val).subscribe(res=>{
      this.router.navigate(['/admin/categoria']);
    });
  }
}
