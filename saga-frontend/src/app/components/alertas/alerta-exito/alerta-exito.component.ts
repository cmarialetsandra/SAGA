import { Component, OnInit } from "@angular/core";
import swal from 'sweetalert2';


@Component({
  selector: "app-alerta-exito",
  templateUrl: "./alerta-exito.component.html"
})

export class AlertaExitoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.showAlert = !this.showAlert;
  }

  showAlert = false;

}

