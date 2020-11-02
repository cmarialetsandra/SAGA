import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-tabla-inventario",
  templateUrl: "./card-tabla-inventario.component.html",
})
export class CardTablaInventarioComponent implements OnInit {
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
