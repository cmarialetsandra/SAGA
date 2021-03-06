import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from "src/app/shared.service";
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: "app-card-editar-libro",
  templateUrl: "./card-editar-libro.component.html",
})
export class CardEditarLibroComponent implements OnInit {

  form = this.fb.group({
    Titulo: ['', [Validators.required, Validators.maxLength(50)]],
    Descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    CantidadPaginas: ['', Validators.required],
    Isbn: ['', Validators.required],
    AnioPublicacion: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
    AutorSeleccionado: ['', Validators.required],
    EditorialSeleccionada: ['', Validators.required],
    CategoriaSeleccionada: ['', Validators.required],
    Entrada: ['', Validators.required],
  }, {});

  constructor(private service: SharedService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.IdLibro = parseInt(this.route.snapshot.paramMap.get('idLibro'), 10);
  }

  @Input() lib: any;
  Titulo: string;
  Descripcion: string;
  CantidadPaginas: number;
  Isbn: string;
  AnioPublicacion: number;
  IdAutor: number;
  IdEditorial: number;
  IdCategoria: number;
  IdLibro: number;
  Entrada: number;

  AutorList: any = [];
  EditorialList: any = [];
  CategoriaList: any = [];
  LibroList: any = [];
  DataList: any = [];

  AutorSeleccionado: string;
  EditorialSeleccionada: string;
  CategoriaSeleccionada: string;

  /*Métodos para la validación de campos vaciós*/
  getErrorMessage(field: string): string {
    let message;
    if (this.form.get(field).errors.required) {
      message = 'No se permite campos vacios';
    }else if (this.form.get(field).hasError('minlength')) {
      message = 'El año de publicación debe tener mínimo 4 dígitos';
    } else if (this.form.get(field).hasError('maxlength')) {
      message = 'El año de publicación debe tener máximo 4 dígitos';
    }
    return message;
  }
  
  getErrorMessageDesc(field: string): string {
    let message;
    if (this.form.get(field).errors.required) {
      message = 'No se permite campos vacios';
    } else if (this.form.get(field).hasError('maxlength')) {
      message = 'La descricpción debe de tener 100 caracteres máximo';
    }
    return message;
  }

  getErrorMessageTitulo(field: string): string {
    let message;
    if (this.form.get(field).errors.required) {
      message = 'No se permite campos vacios';
    } else if (this.form.get(field).hasError('maxlength')) {
      message = 'El título del libro debe de tener 50 caracteres máximo';
    }
    return message;
  }

  isValidField(field: string): boolean {
    return ((this.form.get(field).touched || this.form.get(field).dirty) && !this.form.get(field).valid);
  }
  /*Fin de métodos para validación de campos vacíos*/


  loadAutorList() {
    this.service.getAutorList().subscribe((data: any) => {
      this.AutorList = data;
    });
  }

  loadEditorialList() {
    this.service.getEditorialList().subscribe((data: any) => {
      this.EditorialList = data;
    });
  }

  loadCategoriaList() {
    this.service.getCategoriaList().subscribe((data: any) => {
      this.CategoriaList = data;
    });
  }

  capturarAutor() {
    this.IdAutor = parseInt(this.AutorSeleccionado, 10);
  }

  capturarEditorial() {
    this.IdEditorial = parseInt(this.EditorialSeleccionada, 10);
  }

  capturarCategoria() {
    this.IdCategoria = parseInt(this.CategoriaSeleccionada, 10);
  }

  ngOnInit(): void {
    this.loadAutorList();
    this.loadEditorialList();
    this.loadCategoriaList();
    this.refreshLibroList();
  }

  refreshLibroList() {
    this.service.getLibroFiltrado(this.IdLibro).subscribe(data => {
      this.LibroList = data;
      this.Titulo = this.LibroList.titulo;
      this.Descripcion = this.LibroList.descripcion;
      this.CantidadPaginas = this.LibroList.cantidadPaginas;
      this.Isbn = this.LibroList.isbn;
      this.AnioPublicacion = this.LibroList.anioPublicacion;
      this.AutorSeleccionado = this.LibroList.idAutor;
      this.EditorialSeleccionada = this.LibroList.idEditorial;
      this.CategoriaSeleccionada = this.LibroList.idCategoria;
    });
  }

  editarLibro() {

    if(this.IdAutor == undefined){
      this.IdAutor = parseInt(this.AutorSeleccionado, 10);
    }

    var val = {
      Titulo: this.Titulo,
      Descripcion: this.Descripcion,
      CantidadPaginas: this.CantidadPaginas,
      Isbn: this.Isbn,
      AnioPublicacion: this.AnioPublicacion,
      IdAutor: this.IdAutor,
      IdEditorial: this.IdEditorial,
      IdCategoria: this.IdCategoria
    };

    var val2 = {
      IdLibro: this.IdLibro,
      Titulo: this.Titulo,
      Isbn: this.Isbn,
      IdAutor: this.IdAutor
    };

    /*var val3 = {
      IdLibro: this.IdLibro,
      Isbn: this.Isbn,
    };*/

    console.log("val2", val2);
    console.log("val", val);

    this.service.ExisteLibroEditar(val2).subscribe(res => {
      this.DataList = res;
      

      /*this.service.ExisteIsbnEditar(val3).subscribe(res => {
        this.DataList = res;*/

        this.service.updateLibro(this.IdLibro, val).subscribe(res => {
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
            title: 'Registro editado con éxito'
          })
          /*Fin Mensaje de éxito al guardar*/

          this.router.navigate(['/admin/libro']);
        });
     // });
    });
  }
}
