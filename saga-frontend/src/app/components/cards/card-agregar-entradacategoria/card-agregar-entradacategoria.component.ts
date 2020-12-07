import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-card-agregar-entradacategoria",
  templateUrl: "./card-agregar-entradacategoria.component.html",
})

export class CardAgregarEntradaCategoriaComponent implements OnInit {

  form = this.fb.group({NombreCategoria: ['', Validators.required],}, {});

  constructor(private service: SharedService, private router: Router, private fb: FormBuilder) { }

  @Input() cat: any;

  NombreCategoria: string;
  DataList: any = [];

  ngOnInit(): void { }

  /*Validación de campos vacíos*/
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

  ambosmetodos() {
    var val = {
      NombreCategoria: this.NombreCategoria
    };
    this.service.ExisteCategoria(val).subscribe(res => {
      this.DataList = res;

      this.service.addCategoria(val).subscribe(res => {

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

        this.router.navigate(['/admin/categoria']);
      });
    });
  }
}