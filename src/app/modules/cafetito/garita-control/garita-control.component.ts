import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParcialidadInterface } from '../../componentes-comunes/interfaces/parcialidad.interface';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParcialidadService } from '../../componentes-comunes/servicios/parcialidad.service';
import { VehiculoService } from '../../componentes-comunes/servicios/vehiculo.service';
import { VehiculoInterface } from '../../componentes-comunes/interfaces/vehiculo.interface';

@Component({
  selector: 'app-garita-control',
  templateUrl: './garita-control.component.html',
  styleUrls: ['./garita-control.component.css']
})
export class GaritaControlComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource2.paginator = mp2;
  }

  displayedColumns2: string[] = ['id', 'cuenta', 'peso', 'estado', 'placa', 'acciones'];
  dataSource2 = new MatTableDataSource<ParcialidadInterface>();
  vehiculo!: VehiculoInterface; 
  parcialidad!: ParcialidadInterface; 
  tablaHabilitada: boolean = true; 
  habilitarDetalles: boolean = false; 

  constructor(private parcialidadService: ParcialidadService,
    private snack: MatSnackBar,
    private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    this.parcialidadService.getParcialidadesEnRuta().subscribe(res =>{
      this.dataSource2.data = res
    })
    
  }

  
  
  validarVehiculo(item: ParcialidadInterface) {
    this.tablaHabilitada = false; 
    this.habilitarDetalles = true; 
    this.parcialidad = item; 
    this.vehiculoService.findvehculoByPlaca(item.placa!).subscribe(res => {
      this.vehiculo = res; 
    })
  }

  regresar(){
    this.tablaHabilitada = true; 
    this.habilitarDetalles = false; 
  }

  aprobarIngreso() {
    this.parcialidadService.autorizarIngreso(this.parcialidad.idParcialidad).subscribe(res => {
      if (res) {
        Swal.fire("Ingreso exitoso", 'Se ingresa correctamente', 'success');
        this.tablaHabilitada = true; 
        this.habilitarDetalles = false; 
        this.ngOnInit();
      } else {
        this.snack.open('No se pudo guardar los cambios', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }

}
