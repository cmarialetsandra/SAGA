import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(private service:SharedService, private router:Router) {}

  @Input() log: any;
  User:string;
  Contrasenia:string;
  DataList:any=[];
  Rol:number;

  ngOnInit(): void {}

  login(){
    var val = {
      User:this.User,
      Contrasenia:this.Contrasenia
    };

    this.service.login(val).subscribe(res=>{
      this.DataList=res;
      this.Rol=parseInt(this.DataList.rol, 10);

      if(this.Rol==1){
        localStorage.setItem('tokenUser',this.DataList.user);
        localStorage.setItem('tokenRol',this.DataList.rol);
        this.router.navigate(['/admin/usuario']);
      }
      else if(this.Rol==2){
        localStorage.setItem('tokenUser',this.DataList.user);
        localStorage.setItem('tokenRol',this.DataList.rol);
        localStorage.setItem('tokenId',this.DataList.idUsuario);
        this.router.navigate(['/cliente/cliente-index']);
      }
    });
  }
}
