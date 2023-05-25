import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map} from 'rxjs';
import { AutenticationInterface } from '../interfaces/usuario.interface';
import { ParcialidadInterface, ParcialidadModel } from '../interfaces/parcialidad.interface';
import { MensajeInterface, RespuestaInterface } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ParcialidadService {   
  
  authDataString = sessionStorage.getItem('authData');
  authData: AutenticationInterface = JSON.parse(this.authDataString!);
  token = this.authData.token;

  constructor(private http: HttpClient) { }

    iswebserviceactive(): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

        return this.http.get(environment.BASE_WS_LOCAL + '/isWebServiceActive', { headers });
    }

    getParcialidadesPesaje(): Observable<ParcialidadInterface[]> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<ParcialidadInterface[]>(environment.BASE_WS_LOCAL + `/cafetito/parcialidades/pesaje`, { headers });
    }

    pesajeParcialidad(idParcialidad: number, peso: number): Observable<MensajeInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post<MensajeInterface>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/pesaje/${idParcialidad}/${peso}`, { headers });
    }

    pesajeParcialidadTolerancia(noCuenta: number): Observable<MensajeInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.post<MensajeInterface>(environment.BASE_WS_LOCAL + `/cafetito/cuenta/tolerancia/${noCuenta}`, { headers });
    }

    getParcialidadesEnRuta(): Observable<ParcialidadInterface[]> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<ParcialidadInterface[]>(environment.BASE_WS_LOCAL + `/cafetito/parcialidades/ruta`, { headers });
    }

    autorizarIngreso(idParcialidad: number): Observable<RespuestaInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);    
      return this.http.post<RespuestaInterface>(environment.BASE_WS_LOCAL + `/cafetito/parcialidades/autorizarIngreso/${idParcialidad}`, null ,{ headers});
    }

    getParcialidadesCuenta(noCuenta: string): Observable<ParcialidadInterface[]> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<ParcialidadInterface[]>(environment.BASE_WS_LOCAL + `/cafetito/parcialidades/gestionar/${noCuenta}`, { headers });
    }

    rechazarParcialidadGarita(idParcialidad: number): Observable<RespuestaInterface> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.put<RespuestaInterface>(environment.BASE_WS_LOCAL + `/cafetito/parcialidades/garita/rechazo/${idParcialidad}`, null, { headers });
    }
}