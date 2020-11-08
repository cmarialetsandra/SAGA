import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { ClienteComponent } from "./layouts/cliente/cliente.component";

// admin views
import { AdminPrestamoComponent } from "./views/admin/admin-prestamo/admin-prestamo.component";
import { AgregarEntradaCategoriaComponent } from "./views/admin/agregar-entradacategoria/agregar-entradacategoria.component";
import { AgregarEntradaEditorialComponent } from "./views/admin/agregar-entradaeditorial/agregar-entradaeditorial.component";
import { AgregarEntradaLibroComponent } from "./views/admin/agregar-entradalibro/agregar-entradalibro.component";
import {EditarLibroComponent} from "./views/admin/editar-libro/editar-libro.component";
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { EstadoEntregadoComponent } from "./views/admin/estado-entregado/estado-entregado.component";
import { InventarioComponent } from "./views/admin/inventario/inventario.component";
import { CategoriaComponent } from "./views/admin/categoria/categoria.component";
import { EditorialComponent } from "./views/admin/editorial/editorial.component";
import { LibroComponent } from "./views/admin/libro/libro.component";
import { InventarioDetalleComponent } from "./views/admin/inventario-detalle/inventario-detalle.component";

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

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { ClienteNavbarComponent } from "./components/navbars/cliente-navbar/cliente-navbar.component";
import { LogoNavbarComponent } from "./components/navbars/logo-navbar/logo-navbar.component";
import { CardAgregarEntradaCategoriaComponent } from "./components/cards/card-agregar-entradacategoria/card-agregar-entradacategoria.component";
import { CardAgregarEntradaEditorialComponent } from "./components/cards/card-agregar-entradaeditorial/card-agregar-entradaeditorial.component";
import {CardEditarLibroComponent} from "./components/cards/card-editar-libro/card-editar-libro.component";
import { CardAgregarEntradaLibroComponent } from "./components/cards/card-agregar-entradalibro/card-agregar-entradalibro.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardEstadoEntregadoComponent } from "./components/cards/card-estado-entregado/card-estado-entregado.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardPrestamosClienteComponent } from "./components/cards/card-prestamos-cliente/card-prestamos-cliente.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTablaAdminPrestamoComponent } from "./components/cards/card-tabla-admin-prestamo/card-tabla-admin-prestamo.component";
import { CardTablaAdminCategoriaComponent } from "./components/cards/card-tabla-admin-categoria/card-tabla-admin-categoria.component";
import { CardTablaAdminEditorialComponent } from "./components/cards/card-tabla-admin-editorial/card-tabla-admin-editorial.component";
import { CardTablaLibroComponent } from "./components/cards/card-tabla-admin-libro/card-tabla-admin-libro.component";
import { CardTablaInventarioComponent } from "./components/cards/card-tabla-inventario/card-tabla-inventario.component";
import { CardTablaInventarioDetalleComponent } from "./components/cards/card-tabla-inventario-detalle/card-tabla-inventario-detalle.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterClienteComponent } from "./components/footers/footer-cliente/footer-cliente.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";

//Alertas
import { AlertaExitoComponent } from "./components/alertas/alerta-exito/alerta-exito.component"

//Otras importaciones
import { SharedService } from "./shared.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardEstadoEntregadoComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    FooterClienteComponent,
    CardAgregarEntradaCategoriaComponent,
    CardAgregarEntradaEditorialComponent,
    CardAgregarEntradaLibroComponent,
    CardEditarLibroComponent,
    CardPageVisitsComponent,
    CardPrestamosClienteComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTablaAdminPrestamoComponent,
    CardTablaAdminCategoriaComponent,
    CardTablaAdminEditorialComponent,
    CardTablaLibroComponent,
    CardTablaInventarioComponent,
    CardTablaInventarioDetalleComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    ClienteNavbarComponent,
    LogoNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    ClienteComponent,
    AdminPrestamoComponent,
    AgregarEntradaCategoriaComponent,
    AgregarEntradaEditorialComponent,
    AgregarEntradaLibroComponent,
    EditarLibroComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    EstadoEntregadoComponent,
    InventarioComponent,
    InventarioDetalleComponent,
    CategoriaComponent,
    EditorialComponent,
    LibroComponent,
    LoginComponent,
    RegisterComponent,
    CarritoComponent,
    LibrosComponent,
    PrestamosComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    AlertaExitoComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
