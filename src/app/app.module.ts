import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';

import { ErrorInterceptor } from './modules/componentes-comunes/utils/error.interceptor';
import { AutorizarTransportistasComponent } from './modules/cafetito/autorizar-transportistas/autorizar-transportistas.component';
import { AutorizarVehiculosComponent } from './modules/cafetito/autorizar-vehiculos/autorizar-vehiculos.component';
import { BandejaCuentasComponent } from './modules/cafetito/bandeja-cuentas/bandeja-cuentas.component';
import { GaritaControlComponent } from './modules/cafetito/garita-control/garita-control.component';
import { DashboardComponent } from './modules/componentes-comunes/dashboard/dashboard.component';
import { HomeComponent } from './modules/componentes-comunes/home/home.component';
import { LoginComponent } from './modules/componentes-comunes/login/login.component';
import { NavbarComponent } from './modules/componentes-comunes/navbar/navbar.component';
import { ProfileComponent } from './modules/componentes-comunes/profile/profile.component';
import { SidebarComponent } from './modules/componentes-comunes/sidebar/sidebar.component';
import { PesajeParcialidadComponent } from './modules/peso-cabal/pesaje-parcialidad/pesaje-parcialidad.component';
import { PesajeVehiculoComponent } from './modules/peso-cabal/pesaje-vehiculo/pesaje-vehiculo.component';
import { GestionarCuentaComponent } from './modules/cafetito/gestionar-cuenta/gestionar-cuenta.component';
import { VerificarTransportistaComponent } from './modules/cafetito/garita-control/verificar-transportista/verificar-transportista.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReportesComponent } from './modules/cafetito/reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    AutorizarTransportistasComponent,
    AutorizarVehiculosComponent,
    BandejaCuentasComponent,
    GaritaControlComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent, 
    NavbarComponent,
    ProfileComponent,
    SidebarComponent,
    PesajeParcialidadComponent,
    PesajeVehiculoComponent,
    GestionarCuentaComponent,
    VerificarTransportistaComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
   FormsModule,
   MatSelectModule,
   MatOptionModule,
   MatRadioModule,
   MatGridListModule,
   NgxSpinnerModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide:LocationStrategy, 
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
