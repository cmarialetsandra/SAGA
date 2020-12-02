import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: "app-card-editar-autor",
  templateUrl: "./card-editar-autor.component.html",
})
export class CardEditarAutorComponent  implements OnInit {

  form = this.fb.group({ Nombres: ['', Validators.required], Apellidos: ['', Validators.required], }, { });

  constructor(private service: SharedService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.IdAutor = parseInt(this.route.snapshot.paramMap.get('idAutor'), 10);
  }

  @Input() cat: any;
  Nombres: string;
  Apellidos: string;
  IdAutor: number;
  DataList: any = [];
  AutorList: any = [];


  ngOnInit(): void {
    this.refreshAutorList();
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

  refreshAutorList() {
    this.service.getAutorFiltrada(this.IdAutor).subscribe(data => {
      this.AutorList = data;
      this.Nombres = this.AutorList.nombres;
      this.Apellidos = this.AutorList.apellidos;
    });
  }

  editAutor() {
    var val = {
      Nombres: this.Nombres,
      Apellidos: this.Apellidos
    };

    this.service.ExisteAutor(val).subscribe(res => {
      this.DataList = res;

      this.service.updateAutor(this.IdAutor, val).subscribe(res => {
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

        this.router.navigate(['/admin/autor']);
      });
    });
  }
}
