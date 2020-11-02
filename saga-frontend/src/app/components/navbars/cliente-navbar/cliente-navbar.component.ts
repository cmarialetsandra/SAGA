import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cliente-navbar",
  templateUrl: "./cliente-navbar.component.html",
})
export class ClienteNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
