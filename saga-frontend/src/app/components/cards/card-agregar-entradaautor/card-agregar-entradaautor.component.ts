import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-card-agregar-entradaautor",
  templateUrl: "./card-agregar-entradaautor.component.html",
})
export class CardAgregarEntradaAutorComponent implements OnInit {
  constructor(private service:SharedService, private router:Router) {}

  @Input() cat: any;
  Nombres:string;
  Apellidos:string;

  ngOnInit(): void {
  }

  addAutor(){
    var val = {
      Nombres:this.Nombres,
      Apellidos:this.Apellidos
    };
    
    this.service.addAutor(val).subscribe(res=>{
      this.router.navigate(['/admin/autor']);
    });
  }
}
