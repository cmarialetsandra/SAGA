import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute, Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: "app-card-estado-entregado",
  templateUrl: "./card-estado-entregado.component.html",
})
export class CardEstadoEntregadoComponent implements OnInit {

  IdFiltrado:number;
  EstadoRecibido:number;
  EstadoSeleccionado:string;
  Estado:number;
  fechaHoy:string;
  tzoffset:number;

  constructor(private service: SharedService, private route: ActivatedRoute, private router:Router) {
    this.IdFiltrado = parseInt(this.route.snapshot.paramMap.get('idPrestamo'),10);
    this.EstadoRecibido = parseInt(this.route.snapshot.paramMap.get('estado'),10);
    this.tzoffset = (new Date()).getTimezoneOffset() * 60000;
  }

  ngOnInit(): void {}

  mensaje(){
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

    this.router.navigate(['/admin/admin-prestamo']);
  }

  capturar(){
    this.Estado = parseInt(this.EstadoSeleccionado, 10);
    if(this.Estado == 1){
      this.fechaHoy = null;
    }else{
      this.fechaHoy = (new Date(Date.now() - this.tzoffset)).toISOString().substring(0,10);
    }
  }

  updateEstado(){
    var val = {
      FechaDevolucion : this.fechaHoy,
      Estado : this.Estado
    };
    this.service.updatePrestamos(this.IdFiltrado,val).subscribe(res=>{
      this.mensaje();
    });
  }
}
