import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParcialidadInterface } from '../../componentes-comunes/interfaces/parcialidad.interface';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParcialidadService } from '../../componentes-comunes/servicios/parcialidad.service';

@Component({
  selector: 'app-garita-control',
  templateUrl: './garita-control.component.html',
  styleUrls: ['./garita-control.component.css']
})
export class GaritaControlComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource2.paginator = mp2;
  }

  displayedColumns2: string[] = ['id', 'cuenta', 'peso', 'estado', 'acciones'];
  dataSource2 = new MatTableDataSource<ParcialidadInterface>();

  constructor(private parcialidadService: ParcialidadService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.parcialidadService.getParcialidadesEnRuta().subscribe(res =>{
      this.dataSource2.data = res
    })
    
  }

  aprobarIngreso(item: ParcialidadInterface){
    this.parcialidadService.autorizarIngreso(item.idParcialidad).subscribe(res =>{
      if(res){
        Swal.fire("Ingreso exitoso", 'Se ingresa correctamente','success');
        this.ngOnInit();
      }else{
        this.snack.open('No se pudo guardar los cambios', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }

}
