import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculoInterface } from '../../componentes-comunes/interfaces/vehiculo.interface';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from '../../componentes-comunes/servicios/vehiculo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-autorizar-vehiculos',
  templateUrl: './autorizar-vehiculos.component.html',
  styleUrls: ['./autorizar-vehiculos.component.css']
})
export class AutorizarVehiculosComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }

  displayedColumns: string[] = ['placa', 'marca', 'estado', 'tipo', 'modelo', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<VehiculoInterface>();

  constructor(private vehiculoService: VehiculoService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {

    this.vehiculoService.vehculosCreados().subscribe(res =>{
      if(res.length != 0){
        this.dataSource.data = res;
      }else{
        Swal.fire("Sin Veh�culos",  `Lo sentimos, pero no se encontraron veh�culos nuevos.`,'warning');
      }
    })
    
  }

  applyFilter(event: Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  autorizar(item: VehiculoInterface){
    this.vehiculoService.autorizarVehiculo(item.placaVehiculo).subscribe(res =>{
      if(res){
        Swal.fire("Autorizaci�n Exitosa",  `Se agrego correctamente el veh�culo`,'success').then(()=>{
          this.ngOnInit();
        }         
        );
        
      }else{
        this.snack.open('No se pudo agregar el veh�culo', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })

  }

  rechazar(item: VehiculoInterface){
    this.vehiculoService.rechazarVehiculo(item.placaVehiculo).subscribe(res =>{
      if(res){
        Swal.fire("Rechazo Exitoso",  `No se agrego el veh�culo`,'success');
        this.ngOnInit();
      }else{
        this.snack.open('No se pudo agregar el veh�culo', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
    
  }

}
