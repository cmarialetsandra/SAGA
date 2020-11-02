import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-card-tabla-admin-categoria",
    templateUrl: "./card-tabla-admin-categoria.component.html",
  })
  
export class CardTablaAdminCategoriaComponent implements OnInit {
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
  