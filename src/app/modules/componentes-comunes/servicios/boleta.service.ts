import { Injectable } from "@angular/core";
import { AutenticationInterface } from "../interfaces/usuario.interface";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BoletaDataGeneral } from "../interfaces/boleta.interface";
import { MensajeBcInterface } from "../interfaces/mensaje.interface";

@Injectable({
    providedIn: 'root'
})


  export class BoletaService { 

    authDataString = sessionStorage.getItem('authData');
    authData: AutenticationInterface = JSON.parse(this.authDataString!);
    token = this.authData.token;

  constructor(private http: HttpClient) { }

    iswebserviceactive(): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

        return this.http.get(environment.BASE_WS_LOCAL + '/isWebServiceActive', { headers });
    }

    dataBoleta(idParcialidad: number): Observable<BoletaDataGeneral>{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.get<BoletaDataGeneral>(environment.BASE_WS_LOCAL + `/cafetito/boletapesaje/${idParcialidad}`, { headers });
    }

    mensajeToleranciaCuenta(cuenta: string): Observable<MensajeBcInterface>{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.get<MensajeBcInterface>(environment.BASE_WS_LOCAL + `/cafetito/mensajes/tolerancia/${cuenta}`, { headers });
    }

  }