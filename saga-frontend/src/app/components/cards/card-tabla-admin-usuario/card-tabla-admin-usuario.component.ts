import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import swal from'sweetalert2';

@Component({
    selector: "app-card-tabla-admin-usuario",
    templateUrl: "./card-tabla-admin-usuario.component.html",
  })
  
export class CardTablaAdminUsuarioComponent implements OnInit {
    @Input()
    get color(): string {
      return this._color;
    }
    set color(color: string) {
      this._color = color !== "light" && color !== "dark" ? "light" : color;
    }
    private _color = "light";
  
    constructor(private service: SharedService) {}

    UsuarioList:any=[];
  
    ngOnInit(): void {
      this.refreshUsuarioList();
    }

    refreshUsuarioList(){
      this.service.getUsuarioList().subscribe(data=>{
        this.UsuarioList=data;
      });
    }

    deleteUsuario(id:number){
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
          this.service.deleteUsuario(id).subscribe(data=>{
            this.refreshUsuarioList();
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
  