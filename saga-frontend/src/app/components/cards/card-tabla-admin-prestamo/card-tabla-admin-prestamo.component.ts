import { Component, OnInit, Input } from "@angular/core";

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

  constructor() {}

  ngOnInit(): void {}
}
