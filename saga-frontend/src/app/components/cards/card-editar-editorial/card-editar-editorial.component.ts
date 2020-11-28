import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: "app-card-editar-editorial",
  templateUrl: "./card-editar-editorial.component.html",
})
export class CardEditarEditorialComponent implements OnInit {
  constructor(private service: SharedService, private router: Router, private route: ActivatedRoute) {
    this.IdEditorial = parseInt(this.route.snapshot.paramMap.get('idEditorial'), 10);
  }

  @Input() edit: any;
  IdEditorial: number;
  Nombre: string;
  DataList: any = [];

  EditorialList: any = [];

  ngOnInit(): void {
    this.refreshEditorialList();
  }

  refreshEditorialList() {
    this.service.getEditorialFiltrada(this.IdEditorial).subscribe(data => {
      this.EditorialList = data;
      this.Nombre = this.EditorialList.nombre;
    });
  }

  editAutor() {
    var val = {
      Nombre: this.Nombre
    };
    this.service.ExisteEditorial(val).subscribe(res => {
      this.DataList = res;

      this.service.updateEditorial(this.IdEditorial, val).subscribe(res => {
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
        this.router.navigate(['/admin/editorial']);
      });
    });
  }

}
