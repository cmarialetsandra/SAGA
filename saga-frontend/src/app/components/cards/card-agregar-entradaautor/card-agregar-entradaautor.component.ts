import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: "app-card-agregar-entradaautor",
  templateUrl: "./card-agregar-entradaautor.component.html",
})
export class CardAgregarEntradaAutorComponent implements OnInit {
  form = this.fb.group({ Nombres: ['', Validators.required], Apellidos: ['', Validators.required], }, { });
  

  constructor(private service:SharedService, private router:Router, private fb: FormBuilder) {}

  @Input() cat: any;
  Nombres:string;
  Apellidos:string;
  DataList:any=[];

  ngOnInit(): void {
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
  /*Fin de métodos para validación de campos vacíos*/

  ambosmetodos(){
    var val = {
      Nombres:this.Nombres,
      Apellidos:this.Apellidos
    };
    
    this.service.ExisteAutor(val).subscribe(res=>{
    this.DataList=res;   
    
    this.service.addAutor(val).subscribe(res=>{
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

      this.router.navigate(['/admin/autor']);
    });
    });   
  }
}
