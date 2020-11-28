import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: "app-card-agregar-entradaeditorial",
  templateUrl: "./card-agregar-entradaeditorial.component.html",
})
export class CardAgregarEntradaEditorialComponent implements OnInit {
  constructor(private service: SharedService, private router: Router) { }
  titularAlerta: string = '';

  @Input() cat: any;
  DataList: any = [];
  Nombre: string;

  ngOnInit(): void {
  }

  ambosmetodos() {
    var val = {
      Nombre: this.Nombre
    };
    this.service.ExisteEditorial(val).subscribe(res => {
      this.DataList = res;

      this.service.addEditorial(val).subscribe(res => {

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

        this.router.navigate(['/admin/editorial']);
      });
    });
  }
}
