import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: "app-card-editar-categoria",
  templateUrl: "./card-editar-categoria.component.html",
})
export class CardEditarCategoriaComponent implements OnInit {
  form = this.fb.group({ NombreCategoria: ['', Validators.required], }, {});

  constructor(private service: SharedService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.IdCategoria = parseInt(this.route.snapshot.paramMap.get('idCategoria'), 10);
  }

  @Input() cat: any;
  NombreCategoria: string;
  IdCategoria: number;
  DataList: any = [];

  CategoriaList: any = [];

  ngOnInit(): void {
    this.refreshCategoriaList();
  }

  /*Validación de campos vacíos*/
  getErrorMessage(field: string): string {
    let message;
    if (this.form.get(field).errors.required) {
      message = 'No se permite campos vacios';
    }

    return message;
  }

  isValidField(field: string): boolean {
    return ((this.form.get(field).touched || this.form.get(field).dirty) && !this.form.get(field).valid);
  }
  /*Fin validación*/

  refreshCategoriaList() {
    this.service.getCategoriaFiltrada(this.IdCategoria).subscribe(data => {
      this.CategoriaList = data;
      this.NombreCategoria = this.CategoriaList.nombreCategoria;
    });
  }

  editCategoria() {
    var val = {
      NombreCategoria: this.NombreCategoria
    };

    this.service.ExisteCategoria(val).subscribe(res => {
      this.DataList = res;

      this.service.updateCategoria(this.IdCategoria, val).subscribe(res => {
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

        this.router.navigate(['/admin/categoria']);
      });
    });
  }
}
