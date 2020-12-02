import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidarQueSeanIguales } from './card-agregar-entradausuario.validator';
import swal from 'sweetalert2';

@Component({
  selector: "app-card-agregar-entradausuario",
  templateUrl: "./card-agregar-entradausuario.component.html",
})
export class CardAgregarEntradaUsuarioComponent implements OnInit {

  form = this.fb.group({
    Rol: ['', Validators.required],
    Nombres: ['', Validators.required],
    Apellidos: ['', Validators.required],
    User: ['', [Validators.required, Validators.minLength(4)]],
    Contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    ConfirmarContrasenia: ['', [Validators.required, , Validators.minLength(6)]]
  }, {
    validators: ValidarQueSeanIguales
  });

  constructor(private service: SharedService, private router: Router, private fb: FormBuilder) { }

  @Input() cat: any;
  User: string;
  Contrasenia: string;
  Nombres: string;
  Apellidos: string;
  Rol: number;
  rolSeleccionado: string;
  DataList: any = [];

  ngOnInit(): void {}

  getErrorMessagePwd(field: string): string {
    let message;
    if (this.form.get(field).errors.required) {
      message = 'No se permite campos vacios';
    } else if (this.form.get(field).hasError('minlength')) {
      message = 'La contraseña debe tener como mínimo 6 caracteres';
    }
    return message;
  }

  //Método para validar el mínimo del usuario
  getErrorMessageUser(field: string): string {
    let message;
    if (this.form.get(field).errors.required) {
      message = 'No se permite campos vacios';
    } else if (this.form.get(field).hasError('minlength')) {
      message = 'El usuario debe tener como mínimo 4 caracteres';
    }
    return message;
  }

  /*Métodos para la validación de campos vaciós*/
  getErrorMessage(field: string):string{
    let message;
    if(this.form.get(field).errors.required){
      message = 'No se permite campos vacios';
    }
    return message;
  }

  isValidField(field:string):boolean{
    return((this.form.get(field).touched || this.form.get(field).dirty) && !this.form.get(field).valid);
  }
  
  checarSiSonIguales(): boolean {
    return this.form.hasError('noSonIguales') &&
      this.form.get('Contrasenia').dirty &&
      this.form.get('ConfirmarContrasenia').dirty;
  }

  //Método para capturar el valor del combobox
  capturar() {
    this.Rol = parseInt(this.rolSeleccionado, 10);
  }


  ambosmetodos() {
    var val = {
      User: this.User,
      Contrasenia: this.Contrasenia,
      Nombres: this.Nombres,
      Apellidos: this.Apellidos,
      Rol: this.Rol
    };

    this.service.ExisteUsuario(val).subscribe(res => {
      this.DataList = res;

      this.service.addUsuario(val).subscribe(res => {
        /*Mensaje de éxito al guardar*/
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
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
    });
  }
}