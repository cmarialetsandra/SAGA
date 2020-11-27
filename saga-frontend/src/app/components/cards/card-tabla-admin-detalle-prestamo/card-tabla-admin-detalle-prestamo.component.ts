import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-card-tabla-admin-detalle-prestamo",
  templateUrl: "./card-tabla-admin-detalle-prestamo.component.html",
})
export class CardTablaAdminDetallePrestamoComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  IdFiltrado:number;
  DetallesPrestamosList:any=[];

  constructor(private service: SharedService, private route: ActivatedRoute) {
    this.IdFiltrado = parseInt(this.route.snapshot.paramMap.get('idPrestamo'),10);
  }

  ngOnInit(): void {
    this.refreshPrestamosList();
  }

  refreshPrestamosList(){
    this.service.getDetallePrestamos(this.IdFiltrado).subscribe(data=>{
      this.DetallesPrestamosList=data;
    });
  }
}
