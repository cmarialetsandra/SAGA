import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-cliente-navbar",
  templateUrl: "./cliente-navbar.component.html",
})
export class ClienteNavbarComponent implements OnInit {
  navbarOpen = false;

  tokenUser:string;
  tokenRol:number;

  constructor(private router:Router) {
    this.tokenUser = localStorage.getItem('tokenUser');
    this.tokenRol = parseInt(localStorage.getItem('tokenRol'), 10);
  }

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  onLogout(){
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('tokenRol');
    localStorage.removeItem('tokenId');
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
