import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: "app-card-agregar-entradacategoria",
  templateUrl: "./card-agregar-entradacategoria.component.html",
})
export class CardAgregarEntradaCategoriaComponent implements OnInit {
  constructor(private service:SharedService, private router:Router) {}

  @Input() cat: any;
  NombreCategoria:string;

  ngOnInit(): void {
  }

  addCategoria(){
    var val = {
      NombreCategoria:this.NombreCategoria
    };
    
    this.service.addCategoria(val).subscribe(res=>{
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

      this.router.navigate(['/admin/categoria']);
    });
  }
}
