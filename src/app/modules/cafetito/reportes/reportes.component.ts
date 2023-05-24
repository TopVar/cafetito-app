import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportesService } from '../../componentes-comunes/servicios/reportes.service';
import { ReporteInterface } from '../../componentes-comunes/interfaces/reporte.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExcelReportesService } from '../../componentes-comunes/servicios/excel-reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.reportes.paginator = mp2;
  }

  fecha1: any;
  fecha2: any;

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


  constructor(private reporteService: ReportesService,
    private excelService: ExcelReportesService) { }

  ngOnInit(): void {
    //this.generarReporte('2023-05-01','2023-05-31');
  }

  // obtiene año,mes,dia actual para restringir consulta maxima de 1 año en los calendarios.
  anioActual = new Date().getFullYear();
  mes = new Date().getMonth();
  dia = new Date().getDate();
  minDate = new Date(this.anioActual - 1, this.mes, this.dia);
  maxDate = new Date(this.anioActual, this.mes, this.dia);

  formfiltro = new FormGroup({
    desde: new FormControl(null, Validators.required),
    hasta: new FormControl(null, Validators.required),
  });


  generarReporte(): void {

    this.fecha1 = moment(this.formfiltro.controls.desde.value).format('YYYY-MM-DD');
    this.fecha2 = moment(this.formfiltro.controls.hasta.value).format('YYYY-MM-DD');

    this.reporteService.generarReporte(this.fecha1, this.fecha2)
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

  formValid(): boolean {
    return this.formfiltro.valid;
  }

  limpiar() {
    this.formfiltro.reset(); // Reiniciar los valores del formulario a null
    this.reportes.data = [];
  }

  generarExcel(){
    this.excelService.generateExcel(this.fecha1, this.fecha2, this.reportes.data);
  }
}
