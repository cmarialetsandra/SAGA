import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-logo-navbar",
  templateUrl: "./logo-navbar.component.html",
})
export class LogoNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
