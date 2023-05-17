import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParcialidadInterface } from 'src/app/modules/componentes-comunes/interfaces/parcialidad.interface';
import Swal from 'sweetalert2';
import { ParcialidadService } from '../../componentes-comunes/servicios/parcialidad.service';

@Component({
  selector: 'app-pesaje-parcialidad',
  templateUrl: './pesaje-parcialidad.component.html',
  styleUrls: ['./pesaje-parcialidad.component.css']
})
export class PesajeParcialidadComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }
  
  dataSource = new MatTableDataSource<ParcialidadInterface>();
  displayedColumns2: string[] = ['id', 'cuenta', 'peso', 'estado', 'placa','acciones'];
  inicio!: Boolean;
  generalFormGroup!: FormGroup;

  constructor(private parcialidadService: ParcialidadService) { 
    this.generalFormGroup = new FormGroup({
      peso: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.inicio = true
    this.parcialidadService.getParcialidadesPesaje().subscribe(res =>{
      if(res.length != 0){
        this.dataSource.data = res
      }else{
        Swal.fire("Cuentas no encontradas",  `Lo sentimos, pero no se encontraron parcialidades para pesar.`,'warning');
      }
    })
  }

  regresar(){
    this.inicio = true;
  }

  applyFilter(event: Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  pesar(item:ParcialidadInterface){
    this.inicio= false;

   

  }

  guardar(){

  }
}
