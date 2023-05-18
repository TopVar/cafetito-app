import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map} from 'rxjs';
import { AutenticationInterface } from '../interfaces/usuario.interface';
import { BandejaCuentas, CuentaInterface, ParamCrearCuenta, RespuestaCreacion } from '../interfaces/cuenta.interface';
import { MensajeInterface, RespuestaInterface } from '../interfaces/mensaje.interface';

@Injectable({
    providedIn: 'root'
  })
  export class CuentaService {
    
    authDataString = sessionStorage.getItem('authData');
    authData: AutenticationInterface = JSON.parse(this.authDataString!);
    token = this.authData.token;

  constructor(private http: HttpClient) { }

    iswebserviceactive(): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

        return this.http.get(environment.BASE_WS_LOCAL + '/isWebServiceActive', { headers });
    }

    getCuentasPorAprobar(estado: number): Observable<CuentaInterface[]> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<CuentaInterface[]>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/estado/${estado}`, { headers });
    }

    crearCuenta(param: ParamCrearCuenta): Observable<RespuestaCreacion> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post<RespuestaCreacion>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/crear`,param, { headers });
    }

    pesajeParcialidad(idParcialidad: number, peso: number): Observable<MensajeInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post<MensajeInterface>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/pesaje/${idParcialidad}/${peso}`, null, { headers });
    }

    getCuentasPorGestionar(): Observable<BandejaCuentas[]> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<BandejaCuentas[]>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/gestionar`, { headers });
    }

    actualizarEstadoCuenta(cuenta: string, idEstado: number): Observable<RespuestaInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.put<RespuestaInterface>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/actualizar/${cuenta}/${idEstado}`,null, { headers });
    }

    toleraciaPesajeTotal(noCuenta: string): Observable<MensajeInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post<MensajeInterface>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/tolerancia/${noCuenta}`, null, { headers });
    }
  }