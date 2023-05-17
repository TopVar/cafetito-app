import { Component, OnInit, ViewChild } from '@angular/core';
import { TransportistaInterface } from '../../componentes-comunes/interfaces/transportista.interface';
import { MatTableDataSource } from '@angular/material/table';
import { TransportistaService } from '../../componentes-comunes/servicios/transportista.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-autorizar-transportistas',
  templateUrl: './autorizar-transportistas.component.html',
  styleUrls: ['./autorizar-transportistas.component.css']
})
export class AutorizarTransportistasComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }

  displayedColumns: string[] = ['licencia', 'nombre', 'estado', 'tipo', 'tel', 'correo', 'acciones'];
  dataSource = new MatTableDataSource<TransportistaInterface>();

  constructor(private transportistaService: TransportistaService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.transportistaService.transportistasCreados().subscribe(res =>{
      if(res.length != 0){
        this.dataSource.data = res;
      }else{
        Swal.fire("Sin Transportistas",  `Lo sentimos, pero no se encontraron transportistas nuevos.`,'warning');
      }
    })
  }

  applyFilter(event: Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  autorizar(item: TransportistaInterface){
    this.transportistaService.autorizarTransportista(item.idLicencia).subscribe(res =>{
      if(res){
        Swal.fire("Autorización Exitosa",  `Se agrego correctamente al tranpostista`,'success');
        this.ngOnInit();
      }else{
        this.snack.open('No se pudo agregar al transportista', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })

  }

  rechazar(item: TransportistaInterface){
    this.transportistaService.rechazarTransportista(item.idLicencia).subscribe(res =>{
      if(res){
        Swal.fire("Rechazo Exitoso",  `No se agrego al tranpostista`,'success');
        this.ngOnInit();
      }else{
        this.snack.open('No se pudo agregar al transportista', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }

}
