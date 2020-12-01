import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: "app-card-agregar-entradalibro",
  templateUrl: "./card-agregar-entradalibro.component.html",
})
export class CardAgregarEntradaLibroComponent implements OnInit {

  form = this.fb.group({Entrada: ['', Validators.required],}, {});

  IdFiltrado: number;
  Stock: number;
  EjemplarList: any = [];

  @Input() ent: any;
  Entrada: string;

  constructor(private service: SharedService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.IdFiltrado = parseInt(this.route.snapshot.paramMap.get('idLibro'), 10);
  }

  /*Validación de campos vacíos*/
  getErrorMessage(field: string):string{
    let message;
    if(this.form.get(field).errors.required){
      message = 'No se permite campos vacios';
    }
    
    return message;
  }

  isValidField(field:string):boolean{
    return((this.form.get(field).touched || this.form.get(field).dirty) && !this.form.get(field).valid);
  }


  ngOnInit(): void {
    this.refreshStockList();
  }

  refreshStockList() {
    this.service.getStock(this.IdFiltrado).subscribe(data => {
      this.EjemplarList = data;
      this.Stock = this.EjemplarList.stock;
    });
  }

  addEntradaEjemplar() {
    var val = {
      IdLibro: this.IdFiltrado,
      Stock: this.Stock + this.Entrada,
      Entrada: this.Entrada,
      Salida: 0
    };

    this.service.addEntradaEjemplar(val).subscribe(res => {
      /*Mensaje de éxito al guardar*/
      const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', swal.stopTimer)
          toast.addEventListener('mouseleave', swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Registro guardado con éxito'
      })
      /*Fin Mensaje de éxito al guardar*/

      this.router.navigate(['/admin/inventario-detalle', this.IdFiltrado]);
    });
  }
}