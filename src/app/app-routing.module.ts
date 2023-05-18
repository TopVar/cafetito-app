import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/componentes-comunes/login/login.component';
import { HomeComponent } from './modules/componentes-comunes/home/home.component';
import { DashboardComponent } from './modules/componentes-comunes/dashboard/dashboard.component';
import { BandejaCuentasComponent } from './modules/cafetito/bandeja-cuentas/bandeja-cuentas.component';
import { AutorizarVehiculosComponent } from './modules/cafetito/autorizar-vehiculos/autorizar-vehiculos.component';
import { AutorizarTransportistasComponent } from './modules/cafetito/autorizar-transportistas/autorizar-transportistas.component';
import { PesajeParcialidadComponent } from './modules/peso-cabal/pesaje-parcialidad/pesaje-parcialidad.component';
import { GaritaControlComponent } from './modules/cafetito/garita-control/garita-control.component';
import { PesajeVehiculoComponent } from './modules/peso-cabal/pesaje-vehiculo/pesaje-vehiculo.component';
import { GestionarCuentaComponent } from './modules/cafetito/gestionar-cuenta/gestionar-cuenta.component';
import { BrowserModule } from '@angular/platform-browser';
import { VerificarTransportistaComponent } from './modules/cafetito/garita-control/verificar-transportista/verificar-transportista.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    component: HomeComponent,
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent,
    pathMatch: 'full'
  },
  { 
    path: 'cafetito', 
    component: DashboardComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: 'cuentas',
        component: BandejaCuentasComponent
      },
      {
        path: 'autoriza/vehiculo',
        component: AutorizarVehiculosComponent
      },
      {
        path: 'autoriza/transportista',
        component: AutorizarTransportistasComponent
      },
      {
        path: 'pesaje/parcialidad',
        component: PesajeParcialidadComponent
      },
      {
        path: 'ingreso',
        component: GaritaControlComponent
      },
      {
        path: 'gestionar/cuentas',
        component: GestionarCuentaComponent
      },
      {
        path: 'pesaje/vehiculo',
        component: PesajeVehiculoComponent
      },

      

    ]
  },
  { 
    path: 'transportista/validacion/:licencia/:idParcialidad', 
    component: VerificarTransportistaComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
