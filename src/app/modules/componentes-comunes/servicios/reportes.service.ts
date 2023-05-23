import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map} from 'rxjs';
import { AutenticationInterface } from '../interfaces/usuario.interface';
import { ReporteInterface } from '../interfaces/reporte.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  authDataString = sessionStorage.getItem('authData');
  authData: AutenticationInterface = JSON.parse(this.authDataString!);
  token = this.authData.token;

  constructor(private http: HttpClient) { }

  generarReporte(fecha1:string, fecha2:string): Observable<ReporteInterface[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      return this.http.get<ReporteInterface[]>(environment.BASE_WS_LOCAL + `/agricultor/cuenta/reportes/agricultores?fechaInicio=${fecha1}&fechaFin=${fecha2}`, { headers });
    }
}
