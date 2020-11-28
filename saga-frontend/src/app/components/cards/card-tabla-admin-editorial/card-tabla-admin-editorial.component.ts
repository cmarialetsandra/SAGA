import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import swal from 'sweetalert2';

@Component({
  selector: "app-card-tabla-admin-editorial",
  templateUrl: "./card-tabla-admin-editorial.component.html",
})

export class CardTablaAdminEditorialComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private service: SharedService) { }

  EditorialList: any = [];
  p: number = 1;

  ngOnInit(): void {
    this.refreshEditorialList();
  }

  refreshEditorialList() {
    this.service.getEditorialList().subscribe(data => {
      this.EditorialList = data;
    });
  }

  deleteEditorial(id: number) {
    swal.fire({
      title: '¿Estás seguro?',
      text: "Si borras este registro podrías alterar otra tabla",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44e3c',
      cancelButtonColor: '#a5a5a5',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteEditorial(id).subscribe(data => {
          this.refreshEditorialList();
        });
        swal.fire(
          'Éxito',
          'El registro fue eliminado',
          'success'
        )
      }
    });
  }
}