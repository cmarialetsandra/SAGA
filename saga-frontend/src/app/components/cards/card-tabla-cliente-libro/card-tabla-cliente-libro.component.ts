import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";

@Component({
  selector: "app-card-tabla-cliente-libro",
  templateUrl: "./card-tabla-cliente-libro.component.html",
})
export class CardTablaLibroClienteComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private service: SharedService) {}

  LibroList:any=[];
  
    ngOnInit(): void {
      this.refreshLibroList();
    }

    refreshLibroList(){
      this.service.getLibroList().subscribe(data=>{
        this.LibroList=data;
      });
    }
}
