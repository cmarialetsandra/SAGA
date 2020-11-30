import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';
import { ValidarQueSeanIguales } from '../register/register.validator';
import swal from'sweetalert2';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})



export class RegisterComponent  implements OnInit {
  loginForm: FormGroup;

  constructor(private service:SharedService, private router:Router, private formBuilder: FormBuilder) 
  {}

  @Input() cat: any;
  User:string;
  Contrasenia:string;
  Nombres:string;
  Apellidos:string;
  Rol:number = 2;
  DataList: any = [];

  ngOnInit(): void {
    this.initForm();
  }
  
  

  //Validación si los campos son iguales
  initForm() {
    this.loginForm = this.formBuilder.group({
      'Contrasenia':  ['', Validators.required],
      'ConfirmarContrasenia': ['', Validators.required]
    }, {
      validators: ValidarQueSeanIguales
    });
  }

  checarSiSonIguales(): boolean {
    return this.loginForm.hasError('noSonIguales') &&
      this.loginForm.get('Contrasenia').dirty &&
      this.loginForm.get('ConfirmarContrasenia').dirty;
  }
  //Fin de validación campos iguales


  //Método para guardar el usuario

  Registrar(){
    var val = {
      User:this.User,
      Contrasenia:this.Contrasenia,
      Nombres:this.Nombres,
      Apellidos:this.Apellidos,
      Rol:this.Rol
    };

    this.service.ExisteUsuario(val).subscribe(res => {
      this.DataList = res;

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
  
        this.router.navigate(['/auth/login']);
      }); 
    
    });

  }
}
