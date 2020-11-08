import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";

@Component({
    selector: "app-card-tabla-admin-editorial",
    templateUrl: "./card-tabla-admin-editorial.component.html",
  })
  
export class CardTablaAdminEditorialComponent implements OnInit {
    @Input()
    get color(): string {
      return this._color;
    }
    set color(color: string) {
      this._color = color !== "light" && color !== "dark" ? "light" : color;
    }
    private _color = "light";
  
    constructor(private service: SharedService) {}

    EditorialList:any=[];
  
    ngOnInit(): void {
      this.refreshEditorialList();
    }

    refreshEditorialList(){
      this.service.getEditorialList().subscribe(data=>{
        this.EditorialList=data;
      });
    }
  }
  