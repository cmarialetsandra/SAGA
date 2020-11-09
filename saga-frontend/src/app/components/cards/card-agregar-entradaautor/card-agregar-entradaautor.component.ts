import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: "app-card-agregar-entradaautor",
  templateUrl: "./card-agregar-entradaautor.component.html",
})
export class CardAgregarEntradaAutorComponent implements OnInit {
  constructor(private service:SharedService, private router:Router) {}

  @Input() cat: any;
  Nombres:string;
  Apellidos:string;

  ngOnInit(): void {
  }

  addAutor(){
    var val = {
      Nombres:this.Nombres,
      Apellidos:this.Apellidos
    };
    
    this.service.addAutor(val).subscribe(res=>{
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

      this.router.navigate(['/admin/autor']);
    });
  }
}
