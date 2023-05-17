import { Component, OnInit, ViewChild } from '@angular/core';
import { TransportistaInterface } from '../../componentes-comunes/interfaces/transportista.interface';
import { MatTableDataSource } from '@angular/material/table';
import { TransportistaService } from '../../componentes-comunes/servicios/transportista.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorizar-transportistas',
  templateUrl: './autorizar-transportistas.component.html',
  styleUrls: ['./autorizar-transportistas.component.css']
})
export class AutorizarTransportistasComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }

  qrModalVisible: boolean = false;
  qrCodeUrl!: string;
  nombre!: string;
  displayedColumns: string[] = ['licencia', 'nombre', 'estado', 'tipo', 'tel', 'correo', 'acciones'];
  dataSource = new MatTableDataSource<TransportistaInterface>();

  constructor(private transportistaService: TransportistaService,
    private snack: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.transportistaService.transportistasCreados().subscribe(res => {
      if (res.length != 0) {
        this.dataSource.data = res;
      } else {
        Swal.fire("Sin Transportistas", `Lo sentimos, pero no se encontraron transportistas nuevos.`, 'warning');
      }
    })
  }

  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  autorizar(item: TransportistaInterface) {
    this.transportistaService.autorizarTransportista(item.idLicencia).subscribe(res => {
      if (res) {
        Swal.fire("Autorización Exitosa", `Se agrego correctamente al tranpostista`, 'success');
        this.ngOnInit();
      } else {
        this.snack.open('No se pudo agregar al transportista', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })

  }

  rechazar(item: TransportistaInterface) {
    this.transportistaService.rechazarTransportista(item.idLicencia).subscribe(res => {
      if (res) {
        Swal.fire("Rechazo Exitoso", `No se agrego al tranpostista`, 'success');
        this.ngOnInit();
      } else {
        this.snack.open('No se pudo agregar al transportista', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }

  /*
  generarQR(item: TransportistaInterface) {
    console.log("licencia: " + item.idLicencia);
   // const id = item.idLicencia;
   // this.router.navigate(['cafetito', 'qr', 'transportista', id]);



    const data = 'https://www.w3schools.com/colors/colors_picker.asp';
    const size = '150x150';
    this.transportistaService.generateQRCode(data, size).subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.qrCodeUrl = reader.result as string;
        };
        reader.readAsDataURL(blob);
      },
      (error: any) => { // Specify the type of the error parameter
        console.error('Failed to generate QR code:', error);
      }
    );

    
  }  */


  generarQR(item: TransportistaInterface) {
    this.nombre = item.nombreTransportista;
    const data = 'http://localhost:4200/cafetito/qr/transportista/' + item.idLicencia;
    const size = '150x150';
    this.transportistaService.generateQRCode(data, size).subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.qrCodeUrl = reader.result as string;
          this.qrModalVisible = true; // Show the modal
        };
        reader.readAsDataURL(blob);
      },
      (error: any) => {
        console.error('Failed to generate QR code:', error);
      }
    );
  }



  printQRCode() {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const document = printWindow.document;
      document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body {
                margin: 0; 
                font-family: Roboto, "Helvetica Neue", sans-serif; 
                background: #f5f5f5;

                text-align: center;
              }
              h3 {
                margin-top: 30px;
              }
              img {
                margin-top: 20px;
                max-width: 100%;
              }
            </style>
          </head>
          <body>
            <img src="${this.qrCodeUrl}" alt="QR Code">
            <h3>${this.nombre}</h3>
          </body>
        </html>
      `);
      document.close();
      printWindow.print();
    }
  }

}
