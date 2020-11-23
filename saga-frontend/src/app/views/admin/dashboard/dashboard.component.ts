import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {

  tokenUser:string;
  tokenRol:number;

  constructor(private router:Router) {
    this.tokenUser = localStorage.getItem('tokenUser');
    this.tokenRol = parseInt(localStorage.getItem('tokenRol'), 10);
  }

  ngOnInit() {
    this.autenticacion();
  }

  autenticacion(){
    if(this.tokenRol != 1){
      this.router.navigate(['/error404']);
    }
  }
}
