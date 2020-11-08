import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-card-agregar-entradaeditorial",
  templateUrl: "./card-agregar-entradaeditorial.component.html",
})
export class CardAgregarEntradaEditorialComponent implements OnInit {
  constructor(private service:SharedService, private router:Router) {}

  @Input() cat: any;
  Nombre:string;

  ngOnInit(): void {
  }

  addEditorial(){
    var val = {
      Nombre:this.Nombre
    };

    this.service.addEditorial(val).subscribe(res=>{
      this.router.navigate(['/admin/editorial']);
    });
  }
}
