import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';
import swal from'sweetalert2';

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
  rolSeleccionado:string;

  ngOnInit(): void {
  }

  //Método para capturar el valor del combobox
  capturar() {
    this.Rol = parseInt(this.rolSeleccionado, 10);
  }

  addUsuario(){
    var val = {
      User:this.User,
      Contrasenia:this.Contrasenia,
      Nombres:this.Nombres,
      Apellidos:this.Apellidos,
      Rol:this.Rol
    };
    
    this.service.addUsuario(val).subscribe(res=>{
      /*Mensaje de éxito al guardar*/
      const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', swal.stopTimer)
          toast.addEventListener('mouseleave', swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Registro guardado con éxito'
      })
      /*Fin Mensaje de éxito al guardar*/

      this.router.navigate(['/admin/usuario']);
    });
  }
}
