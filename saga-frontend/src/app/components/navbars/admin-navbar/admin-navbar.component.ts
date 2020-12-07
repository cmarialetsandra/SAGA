import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {

  tokenUser:string;
  tokenRol:number;

  constructor(private router:Router) {
    this.tokenUser = localStorage.getItem('tokenUser');
    this.tokenRol = parseInt(localStorage.getItem('tokenRol'), 10);
  }

  ngOnInit(): void {}

  onLogout(){
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('tokenRol');
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
