import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-card-tabla-inventario-detalle",
  templateUrl: "./card-tabla-inventario-detalle.component.html",
})
export class CardTablaInventarioDetalleComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  IdFiltrado:number;
  EjemplarList:any=[];

  constructor(private service:SharedService, private route: ActivatedRoute) {
    this.IdFiltrado = parseInt(this.route.snapshot.paramMap.get('idLibro'),10);
  }

  ngOnInit(): void {
    this.refreshEjemplarList();
  }

  refreshEjemplarList(){
    this.service.getEjemplar(this.IdFiltrado).subscribe(data=>{
      this.EjemplarList=data;
    });
  }
}
