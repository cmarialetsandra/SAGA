import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import swal from'sweetalert2';

@Component({
  selector: "app-card-editar-usuario",
  templateUrl: "./card-editar-usuario.component.html",
})
export class CardEditarUsuarioComponent implements OnInit {
 
  form = this.fb.group({
    User: ['', [Validators.required, Validators.minLength(4)]],
    Rol: ['', Validators.required],
    Nombres: ['', Validators.required],
    Apellidos: ['', Validators.required],
    Contrasenia: ['', Validators.required],
    ConfirmarContrasenia: ['', Validators.required]
  }, { });

  constructor(private service:SharedService, private router:Router, private route:ActivatedRoute, private fb: FormBuilder) {
    this.IdUsuario = parseInt(this.route.snapshot.paramMap.get('idUsuario'), 10);
  }

  @Input() cat: any;
  User:string;
  Contrasenia:string;
  Nombres:string;
  Apellidos:string;
  Rol:number;
  rolSeleccionado:string;
  IdUsuario:number;
  DataList: any = [];
  
  UsuarioList:any=[];

  ngOnInit(): void {
    this.refreshUsuarioList();
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
  /*Método para la validación de campos vaciós*/
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
  /*Fin de método para validación de campos vacíos*/
  
  refreshUsuarioList(){
    this.service.getUsuarioFiltrado(this.IdUsuario).subscribe(data => {
      this.UsuarioList = data;
      this.User=this.UsuarioList.user;
      this.Nombres=this.UsuarioList.nombres;
      this.Apellidos=this.UsuarioList.apellidos;
      this.rolSeleccionado=this.UsuarioList.rol;
    });
  }

  //Método para capturar el valor del combobox
  capturar() {
    this.Rol = parseInt(this.rolSeleccionado, 10);
  }

  editUsuario(){
    var val = {
      User:this.User,
      Contrasenia:this.Contrasenia,
      Nombres:this.Nombres,
      Apellidos:this.Apellidos,
      Rol:this.Rol
    };

    this.service.ExisteUsuario(val).subscribe(res => {
      this.DataList = res;
    
    this.service.updateUsuario(this.IdUsuario,val).subscribe(res=>{
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
        title: 'Registro editado con éxito'
      })
      /*Fin Mensaje de éxito al guardar*/

      this.router.navigate(['/admin/usuario']);
    });
  });
  }
}
