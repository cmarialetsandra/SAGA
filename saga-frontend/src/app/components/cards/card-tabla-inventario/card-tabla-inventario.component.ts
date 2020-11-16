import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';

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

  constructor(private service:SharedService, private router:Router) {}

  TotalEjemplarList:any=[];
    
  ngOnInit(): void {
    this.refreshTotalEjemplarList();
  }

  refreshTotalEjemplarList(){
    this.service.getEjemplarTotal().subscribe(data=>{
      this.TotalEjemplarList=data;
    });
  }
}
