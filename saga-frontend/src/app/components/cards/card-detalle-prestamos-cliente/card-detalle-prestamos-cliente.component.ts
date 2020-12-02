import { Component, OnInit } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: "app-card-detalle-prestamos-cliente",
  templateUrl: "./card-detalle-prestamos-cliente.component.html",
})
export class CardDetallePrestamosClienteComponent implements OnInit {

  IdFiltrado:number;
  DetallePrestamosList:any=[];  

  constructor(private service:SharedService, private route: ActivatedRoute) {
    this.IdFiltrado = parseInt(this.route.snapshot.paramMap.get('idPrestamo'),10);
  }

  refreshPrestamosList(){
    this.service.getDetallePrestamos(this.IdFiltrado).subscribe(data=>{
      this.DetallePrestamosList=data;
    });
  }

  ngOnInit(): void {
    this.refreshPrestamosList();
  }
}
