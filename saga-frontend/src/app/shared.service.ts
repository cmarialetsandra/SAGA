import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:44301/api";

  constructor(private http:HttpClient) {}

    
  //Métodos de CATEGORIA
  getCategoriaList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/Categorias");
  }

  addCategoria(val: any){
    return this.http.post(this.APIUrl+"/Categorias",val);
  }

  updateCategoria(id: number,val: any){
    return this.http.put(this.APIUrl+"/Categorias/"+id,val);
  }

  deleteCategoria(id: number){
    return this.http.delete(this.APIUrl+"/Categorias/"+id);
  }

  getCategoriaFiltrada(val:number):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/Categorias/"+val);
  }
  //Fin métodos CATEGORIA

  //Métodos de EDITORIAL
  getEditorialList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/Editoriales");
  }

  addEditorial(val: any){
    return this.http.post(this.APIUrl+"/Editoriales",val);
  }
  //Fin métodos EDITORIAL

  //Métodos de AUTOR
  getAutorList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/Autores");
  }

  addAutor(val: any){
    return this.http.post(this.APIUrl+"/Autores",val);
  }

  updateAutor(id: number,val: any){
    return this.http.put(this.APIUrl+"/Autores/"+id,val);
  }

  deleteAutor(id: number){
    return this.http.delete(this.APIUrl+"/Autores/"+id);
  }

  getAutorFiltrada(val:number):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/Autores/"+val);
  }
  //Fin métodos AUTOR

  //Métodos de USUARIO
  getUsuarioList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/Usuarios");
  }

  addUsuario(val: any){
    return this.http.post(this.APIUrl+"/Usuarios",val);
  }
  
  updateUsuario(id: number,val: any){
    return this.http.put(this.APIUrl+"/Usuarios/"+id,val);
  }

  deleteUsuario(id: number){
    return this.http.delete(this.APIUrl+"/Usuarios/"+id);
  }

  getUsuarioFiltrado(val:number):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/Usuarios/"+val);
  }

  login(val: any):Observable<any[]>{
    return this.http.post<any>(this.APIUrl+"/Usuarios/login",val);
  }
  //Fin métodos USUARIO

  //Métodos de LIBRO
  getLibroList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/VistaLibros");
  }

  addLibro(val: any){
    return this.http.post(this.APIUrl+"/Libros",val);
  }
  //Fin métodos LIBRO

  //Métodos de EJEMPLAR
  getEjemplarTotal():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/VistaTotalEjemplares");
  }

  getEjemplar(val:number):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/VistaEjemplares/"+val);
  }

  getStock(val:number):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/Stock/"+val);
  }

  addEntradaEjemplar(val: any){
    return this.http.post(this.APIUrl+"/Ejemplares",val);
  }

  getUltimoLibro():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + "/Stock");
  }
  //Fin métodos EJEMPLAR
}