import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import swal from'sweetalert2';

@Component({
    selector: "app-card-tabla-admin-categoria",
    templateUrl: "./card-tabla-admin-categoria.component.html",
  })
  
export class CardTablaAdminCategoriaComponent implements OnInit {
    @Input()
    get color(): string {
      return this._color;
    }
    set color(color: string) {
      this._color = color !== "light" && color !== "dark" ? "light" : color;
    }
    private _color = "light";
  
    constructor(private service: SharedService) {}

    CategoriaList:any=[];
  
    ngOnInit(): void {
      this.refreshCategoriaList();
    }

    refreshCategoriaList(){
      this.service.getCategoriaList().subscribe(data=>{
        this.CategoriaList=data;
      });
    }

    deleteCategoria(id:number){
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
          this.service.deleteCategoria(id).subscribe(data=>{
            this.refreshCategoriaList();
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
  