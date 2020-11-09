import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";

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
  
    constructor(private service: SharedService) {}

    CategoriaList:any=[];
  
    ngOnInit(): void {
      this.refreshCategoriaList();
    }

    refreshCategoriaList(){
      this.service.getCategoriaList().subscribe(data=>{
        this.CategoriaList=data;
      });
    }
  }
  