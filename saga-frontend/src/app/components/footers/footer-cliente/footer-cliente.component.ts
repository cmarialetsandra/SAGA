import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer-cliente",
  templateUrl: "./footer-cliente.component.html",
})
export class FooterClienteComponent implements OnInit {
  date = new Date().getFullYear();
  constructor() {}

  ngOnInit(): void {}
}
