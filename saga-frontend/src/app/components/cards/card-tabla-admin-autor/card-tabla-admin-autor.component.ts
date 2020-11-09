import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";

@Component({
    selector: "app-card-tabla-admin-autor",
    templateUrl: "./card-tabla-admin-autor.component.html",
  })
  
export class CardTablaAdminAutorComponent implements OnInit {
    @Input()
    get color(): string {
      return this._color;
    }
    set color(color: string) {
      this._color = color !== "light" && color !== "dark" ? "light" : color;
    }
    private _color = "light";
  
    constructor(private service: SharedService) {}

    AutorList:any=[];
  
    ngOnInit(): void {
      this.refreshAutorList();
    }

    refreshAutorList(){
      this.service.getAutorList().subscribe(data=>{
        this.AutorList=data;
      });
    }
  }
  