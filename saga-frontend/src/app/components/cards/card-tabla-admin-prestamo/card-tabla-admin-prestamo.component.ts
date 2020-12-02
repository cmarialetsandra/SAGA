import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "app-card-tabla-admin-prestamo",
  templateUrl: "./card-tabla-admin-prestamo.component.html",
})
export class CardTablaAdminPrestamoComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  PrestamosList:any=[];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.refreshPrestamosList();
  }

  refreshPrestamosList(){
    this.service.getPrestamosAdmin().subscribe(data=>{
      this.PrestamosList=data;
    });
  }
}
