import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParcialidadInterface } from 'src/app/modules/componentes-comunes/interfaces/parcialidad.interface';
import Swal from 'sweetalert2';
import { ParcialidadService } from '../../componentes-comunes/servicios/parcialidad.service';
import { CuentaService } from '../../componentes-comunes/servicios/cuenta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoletaService } from '../../componentes-comunes/servicios/boleta.service';

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
  idParcialidad: number = 0;
  formulario: Boolean = false;
  boletaFormGroup!: FormGroup;

  constructor(private parcialidadService: ParcialidadService,
    private cuentaService: CuentaService,
    private snack: MatSnackBar,
    private boletaService: BoletaService) { 

    this.generalFormGroup = new FormGroup({
      peso: new FormControl('', Validators.required)
    })

    this.boletaFormGroup = new FormGroup({
      usuario: new FormControl({value: "", disabled: true}),
      fecha: new FormControl({value: "", disabled: true}),
      tipo: new FormControl({value: "", disabled: true}),
      placa: new FormControl({value: "", disabled: true}),
      licencias: new FormControl({value: "", disabled: true}),
      pesaje: new FormControl({value: "", disabled: true}),
      estadoC: new FormControl({value: "", disabled: true}),
      noCuenta: new FormControl({value: "", disabled: true}),
      estadoP: new FormControl({value: "", disabled: true}),
      idParcialidad: new FormControl({value: "", disabled: true}),
      idBoleta: new FormControl({value: "", disabled: true}),
    })

  }

  ngOnInit(): void {
    this.inicio = true
    this.formulario = false;
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

  pesar(item: ParcialidadInterface){    
    this.inicio= false;
    this.idParcialidad = item.idParcialidad;  

  }

  guardar(){
    const peso: number = this.generalFormGroup.get('peso')?.value
    console.log("PESO", peso, " parcialidad", this.idParcialidad);
    
    this.cuentaService.pesajeParcialidad(this.idParcialidad, peso).subscribe(res=>{
      console.log(res);
      if(res){
        Swal.fire("Pesaje Exitoso",  res.mensaje,'success');
        this.formulario = true;

        this.boletaService.dataBoleta(this.idParcialidad).subscribe(data =>{

          this.boletaFormGroup.patchValue({
            usuario: data.usuarioPeso,
            pesaje: data.resultadoPesaje,
            fecha: data.fechaPesaje,
            tipo: data.tipoVehiculo,
            placa: data.placaVehiculo,
            licencias: data.transportistas,
            estadoC: data.estadoCuenta,
            noCuenta: data.noCuenta,
            estadoP: data.estadoParcialidad,
            idParcialidad: data.idParcialidad,
            idBoleta: data.idBoleta
          })

        })


      }else{
        this.snack.open('No se pudo agregar al transportista', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
      
    })

  }

  imprimirBoleta(){

  }
}
