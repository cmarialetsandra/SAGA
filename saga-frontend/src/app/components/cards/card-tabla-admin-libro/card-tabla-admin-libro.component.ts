import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import swal from'sweetalert2';

@Component({
  selector: "app-card-tabla-admin-libro",
  templateUrl: "./card-tabla-admin-libro.component.html",
})
export class CardTablaLibroComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private service: SharedService) {}

  LibroList:any=[];
  
    ngOnInit(): void {
      this.refreshLibroList();
    }

    refreshLibroList(){
      this.service.getLibroList().subscribe(data=>{
        this.LibroList=data;
      });
    }

    deleteLibro(id:number){
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
          this.service.deleteLibro(id).subscribe(data=>{
            this.refreshLibroList();
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
