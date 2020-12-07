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
  DetallePrestamoList:any=[];
  EjemplarList:any=[];

  constructor(private service: SharedService, private route: ActivatedRoute, private router:Router) {
    this.IdFiltrado = parseInt(this.route.snapshot.paramMap.get('idPrestamo'),10);
    this.EstadoRecibido = parseInt(this.route.snapshot.paramMap.get('estado'),10);
    this.tzoffset = (new Date()).getTimezoneOffset() * 60000;
  }

  ngOnInit(): void {
    this.refreshDetallePrestamo();
  }

  refreshDetallePrestamo(){
    this.service.getDetallePrestamos(this.IdFiltrado).subscribe(res=>{
      this.DetallePrestamoList = res;
    });
  }

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
      for(let i of this.DetallePrestamoList){
        
        this.service.getStock(i.idLibro).subscribe(res =>{
          this.EjemplarList = res;
          
          if(this.Estado == 2){ 
            var suma = this.EjemplarList.stock + i.cantidad;
            var valE = {      
              IdLibro:i.idLibro,
              Stock:suma,
              Entrada:i.cantidad,
              Salida: 0
            };   
            
            this.service.addEntradaEjemplar(valE).subscribe(res=>{ });
          }else if(this.Estado == 1){ 
            var resta = this.EjemplarList.stock - i.cantidad;
            var valS = {      
              IdLibro:i.idLibro,
              Stock:resta,
              Entrada: 0,
              Salida: i.cantidad
            };    
            
            this.service.addEntradaEjemplar(valS).subscribe(res=>{ });
          }
        });
      }
      this.mensaje();  
    });
  }
}
