import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";

@Component({
    selector: "app-card-tabla-admin-usuario",
    templateUrl: "./card-tabla-admin-usuario.component.html",
  })
  
export class CardTablaAdminUsuarioComponent implements OnInit {
    @Input()
    get color(): string {
      return this._color;
    }
    set color(color: string) {
      this._color = color !== "light" && color !== "dark" ? "light" : color;
    }
    private _color = "light";
  
    constructor(private service: SharedService) {}

    UsuarioList:any=[];
  
    ngOnInit(): void {
      this.refreshUsuarioList();
    }

    refreshUsuarioList(){
      this.service.getUsuarioList().subscribe(data=>{
        this.UsuarioList=data;
      });
    }
  }
  