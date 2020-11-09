import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-card-agregar-entradausuario",
  templateUrl: "./card-agregar-entradausuario.component.html",
})
export class CardAgregarEntradaUsuarioComponent implements OnInit {
  constructor(private service:SharedService, private router:Router) {}

  @Input() cat: any;
  User:string;
  Contrasenia:string;
  Nombres:string;
  Apellidos:string;
  Rol:number;

  ngOnInit(): void {
  }

  addAutor(){
    var val = {
      User:this.User,
      Contrasenia:this.Contrasenia,
      Nombres:this.Nombres,
      Apellidos:this.Apellidos,
      Rol:this.Rol
    };
    
    this.service.addUsuario(val).subscribe(res=>{
      this.router.navigate(['/admin/usuario']);
    });
  }
}
