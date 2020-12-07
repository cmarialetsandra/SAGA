import { Component, OnInit } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import swal from'sweetalert2';

@Component({
  selector: "app-card-prestamos-cliente",
  templateUrl: "./card-prestamos-cliente.component.html",
})
export class CardPrestamosClienteComponent implements OnInit {

  PrestamosList:any=[];
  tokenId:number;
  

  constructor(private service: SharedService) {
    this.tokenId = parseInt(localStorage.getItem('tokenId'), 10);
  }

  refreshPrestamosList(){
    this.service.getPrestamosClientes(this.tokenId).subscribe(data=>{
      this.PrestamosList=data;
    });
  }

  ngOnInit(): void {
    this.refreshPrestamosList();
  }
}
