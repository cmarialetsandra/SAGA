import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { ClienteComponent } from "./layouts/cliente/cliente.component";

// admin views
import { AdminPrestamoComponent } from "./views/admin/admin-prestamo/admin-prestamo.component";
import { AgregarEntradaLibroComponent } from "./views/admin/agregar-entradalibro/agregar-entradalibro.component";
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { EstadoEntregadoComponent } from "./views/admin/estado-entregado/estado-entregado.component";
import { InventarioComponent } from "./views/admin/inventario/inventario.component";
import { LibroComponent } from "./views/admin/libro/libro.component";
import { InventarioDetalleComponent } from "./views/admin/inventario-detalle/inventario-detalle.component";
import { CategoriaComponent } from "./views/admin/categoria/categoria.component";
import { AutorComponent } from "./views/admin/autor/autor.component";
import { UsuarioComponent } from "./views/admin/usuario/usuario.component";
import { AgregarEntradaCategoriaComponent } from "./views/admin/agregar-entradacategoria/agregar-entradacategoria.component";
import { AgregarEntradaEditorialComponent } from "./views/admin/agregar-entradaeditorial/agregar-entradaeditorial.component";
import {EditarLibroComponent} from "./views/admin/editar-libro/editar-libro.component";
import {AgregarLibroComponent} from "./views/admin/agregar-libro/agregar-libro.component";
import { AgregarEntradaAutorComponent } from './views/admin/agregar-entradaautor/agregar-entradaautor.component';
import { AgregarEntradaUsuarioComponent } from './views/admin/agregar-entradausuario/agregar-entradausuario.component';


// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// cliente views
import { CarritoComponent } from "./views/cliente/carrito/carrito.component";
import { LibrosComponent } from "./views/cliente/libros/libros.component";
import { PrestamosComponent } from "./views/cliente/prestamos/prestamos.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { EditorialComponent } from './views/admin/editorial/editorial.component';

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "admin-prestamo", component: AdminPrestamoComponent },
      { path: "agregar-entradalibro", component: AgregarEntradaLibroComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "estado-entregado", component: EstadoEntregadoComponent },
      { path: "inventario", component: InventarioComponent },
      { path: "inventario-detalle", component: InventarioDetalleComponent },
      { path: "categoria", component: CategoriaComponent },
      { path: "libro", component: LibroComponent },
      { path:"editorial",component:EditorialComponent},
      { path:"autor",component:AutorComponent},
      { path:"usuario",component:UsuarioComponent},
      { path: "entrada-libro", component: AgregarLibroComponent},
      { path: "editar-libro", component: EditarLibroComponent},
      { path: "entrada-categoria", component: AgregarEntradaCategoriaComponent },
      { path: "entrada-autor", component: AgregarEntradaAutorComponent },
      { path: "entrada-usuario", component: AgregarEntradaUsuarioComponent },
      { path: "entrada-editorial", component: AgregarEntradaEditorialComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },

    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
    // cliente views
    {
      path: "cliente",
      component: ClienteComponent,
      children: [
        { path: "libros", component: LibrosComponent },
        { path: "carrito", component: CarritoComponent },
        { path: "prestamos", component: PrestamosComponent },        
        { path: "", redirectTo: "libros", pathMatch: "full" },
      ],
    },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
