import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-tabla-admin-libro",
  templateUrl: "./card-tabla-admin-libro.component.html",
})
export class CardTablaLibroComponent implements OnInit {
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
