import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BandejaCuentas } from '../../componentes-comunes/interfaces/cuenta.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { ParcialidadInterface, ParcialidadModel } from '../../componentes-comunes/interfaces/parcialidad.interface';
import { CuentaService } from '../../componentes-comunes/servicios/cuenta.service';
import { ParcialidadService } from '../../componentes-comunes/servicios/parcialidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { BoletaService } from '../../componentes-comunes/servicios/boleta.service';

@Component({
  selector: 'app-gestionar-cuenta',
  templateUrl: './gestionar-cuenta.component.html',
  styleUrls: ['./gestionar-cuenta.component.css']
})
export class GestionarCuentaComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }

  displayedColumns: string[] = ['id','peso', 'cantidad', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<BandejaCuentas>();
  inicio: Boolean = true;
  generalFormGroup!: FormGroup;
  displayedColumns2: string[] = ['id', 'cuenta', 'peso'];
  dataSource2 = new MatTableDataSource<ParcialidadInterface>();
  detalleFormGroup!: FormGroup
  estadoCuenta!: number;

  constructor(private cuentaService: CuentaService,
    private parcialidadService: ParcialidadService,
    private snack: MatSnackBar,
    private boletaService: BoletaService) { 

      this.generalFormGroup = new FormGroup({
        peso: new FormControl({value: "", disabled: true}),
        cantidadParcialidades: new FormControl({value: "", disabled: true}),
        estado: new FormControl({value: "", disabled: true}),
        cuenta: new FormControl({value: "", disabled: true}),
        idEstado: new FormControl({value: "", disabled: true}),
      })

      this.detalleFormGroup = new FormGroup({
        pesoTotal: new FormControl({value: "", disabled: true}),
        mensaje: new FormControl({value: "", disabled: true}),
      })
    }

  ngOnInit(): void {
    this.cuentaService.getCuentasPorGestionar().subscribe(res =>{
      this.dataSource.data = res
    })
  }

  applyFilter(event: Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  regresar(){
    this.inicio = true;
  }

  verDetalle(item: BandejaCuentas){
    this.inicio = false;
    this.estadoCuenta = item.estado;
    this.generalFormGroup.patchValue({
      peso: item.peso,
      cantidadParcialidades: item.cantidad,
      estado: item.estadoNombre,
      cuenta: item.numeroCuenta,
      idEstado: item.estado
    })

    this.parcialidadService.getParcialidadesCuenta(item.numeroCuenta).subscribe(res =>{
      console.log(res);
      
      this.dataSource2.data = res
    })

    if(item.estado != 5){
      //mensaje de las tolerancias cuando se va a confirmar la cuenta
      this.boletaService.mensajeToleranciaCuenta(item.numeroCuenta).subscribe(data =>{

        if(data){
          this.detalleFormGroup.patchValue({
            pesoTotal: data.totalPesaje,
            mensaje: data.mensaje
          })
        }

      })
    }

  }

  cerrarCuenta(){
    const cuenta: string = this.generalFormGroup.get('cuenta')?.value
    this.cuentaService.actualizarEstadoCuenta(cuenta, 6).subscribe(res =>{
      if(res){

        this.cuentaService.toleraciaPesajeTotal(cuenta).subscribe(msg =>{
          if(msg){
            Swal.fire("Actualización Completa",  msg.mensaje,'success').then(()=>{
              this.ngOnInit()
            });
          }
        })

      }else{
        this.snack.open('No se actualizar la cuenta', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })

  }

  confirmarCuenta(){
    const cuenta: string = this.generalFormGroup.get('cuenta')?.value
    this.cuentaService.actualizarEstadoCuenta(cuenta, 7).subscribe(res =>{
      if(res){
        Swal.fire(res.titulo,  res.contenido,'success').then(()=>{
          this.ngOnInit()
        });
      }else{
        this.snack.open('No se actualizar la cuenta', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })

  }

}
