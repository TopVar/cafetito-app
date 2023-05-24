import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ReporteInterface } from '../interfaces/reporte.interface';

@Injectable({
  providedIn: 'root'
})
export class ExcelReportesService {

  constructor() { }
  generateExcel(fechaDesde: string, fechaHasta: string, reportes: ReporteInterface[]) {

    const title = 'REPORTE DE AGRICULTORES';
    const header = [
      'Agricultor',
      'Usuario',
      'Email',
      'Telefono',
      'Peso Total',
      'cantidad Cuentas Confirmadas',
      'Cantidad Cuentas con Faltantes',
      'Cantidad Cuentas con Sobrantes',
      'Cantidad Cuentas Completas'
    ];

    const data: any[] = [];
    reportes.forEach((reporte: ReporteInterface) => {
      const arr: any[] = [
        reporte.nombreAgricultor,
        reporte.usuarioAgricultor,
        reporte.emailAgricultor,
        reporte.telefonoAgricultor,
        reporte.pesoTotal,
        reporte.cantidadCuentas,
        reporte.toleranciaMenor,
        reporte.toleranciaMayor,
        reporte.toleranciaCoincide
      ];
      data.push(arr);
    });

    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Hoja 1');
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { size: 15, bold: true };
    worksheet.addRow([]);
    worksheet.addRow([`DESDE: ${fechaDesde} HASTA: ${fechaHasta}`]);

    worksheet.mergeCells('A1:D2');
    worksheet.mergeCells('A3:C3');
    //Blank Row
    worksheet.addRow([]);
    //Add Header Row
    let headerRow = worksheet.addRow(header);


    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '2f5ecc' },
        bgColor: { argb: 'FFFFFF' },
      };
      cell.font = {
        color: { argb: 'FFFFFF' }
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    data.forEach((d, i) => {
      let row = worksheet.addRow(d);
      row.eachCell((cell, n) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      })
      worksheet.getRow(i + 6).alignment = { wrapText: true };
    });

    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 15;
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 10;
    worksheet.getColumn(6).width = 30;
    worksheet.getColumn(7).width = 30;
    worksheet.getColumn(8).width = 30;
    worksheet.getColumn(9).width = 30;

    // worksheet.getColumn(19).width = 10;
    worksheet.getRow(5).alignment = { wrapText: true };
    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'ReporteTrazabilidadSolicitud.xlsx');
    });
  }
}
