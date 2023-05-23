import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportesService } from '../../componentes-comunes/servicios/reportes.service';
import { ReporteInterface } from '../../componentes-comunes/interfaces/reporte.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.reportes.paginator = mp2;
  }

  displayedColumns: string[] = [
    'Agricultor',
    'Usuario', 
    'Email', 
    'Telefono', 
    'Peso Total', 
    'cantidadCuentas', 
    'Cantidad Faltantes',
    'Cantidad Sobrantes',
    'Cantidad Entregas Completas'];
  reportes = new MatTableDataSource<ReporteInterface>();


  constructor(private reporteService: ReportesService) { }

  ngOnInit(): void {
    this.generarReporte('2023-05-01','2023-05-31');
  }

  generarReporte(fechaInicio: string, fechaFin: string): void {
    this.reporteService.generarReporte(fechaInicio, fechaFin)
      .subscribe( res => {
        if(res.length != 0){
          this.reportes.data = res;
        }else{
          Swal.fire("Sin registros",  `No se encontraron registros con los parámetros ingresados.`,'warning').then(()=>{
            this.reportes.data = []
          })
        }
      })
  }

  applyFilter(event: Event){
    this.reportes.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

}
