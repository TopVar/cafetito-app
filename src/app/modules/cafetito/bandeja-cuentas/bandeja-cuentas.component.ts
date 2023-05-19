import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CuentaInterface, ParamCrearCuenta, VehiculosAsignados } from '../../componentes-comunes/interfaces/cuenta.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransportistaInterface } from '../../componentes-comunes/interfaces/transportista.interface';
import { VehiculoInterface } from '../../componentes-comunes/interfaces/vehiculo.interface';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuentaService } from '../../componentes-comunes/servicios/cuenta.service';

@Component({
  selector: 'app-bandeja-cuentas',
  templateUrl: './bandeja-cuentas.component.html',
  styleUrls: ['./bandeja-cuentas.component.css']
})
export class BandejaCuentasComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }

  displayedColumns: string[] = ['peso', 'cantidad','agricultor', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<CuentaInterface>();
  inicio: Boolean = true;
  generalFormGroup!: FormGroup;
  viewing: Boolean = true;
  displayedColumns2: string[] = ['placa', 'marca', 'estado', 'tipo', 'modelo', 'color', 'peso'];
  dataSource2 = new MatTableDataSource<VehiculoInterface>();
  displayedColumns3: string[] = ['licencia', 'nombre', 'estado', 'tipo', 'tel', 'correo'];
  dataSource3 = new MatTableDataSource<TransportistaInterface>();
  comentarioFormGroup!: FormGroup;
  inputComentario: Boolean = false;
  tipoOperacion!: number;

  constructor(private cuentaService: CuentaService, 
    private snack: MatSnackBar,) {
    this.generalFormGroup = new FormGroup({
      idVenta: new FormControl({value: "", disabled: true}),
      peso: new FormControl({value: "", disabled: true}),
      parcialidades: new FormControl({value: "", disabled: true}),
      agricultor: new FormControl({value: "", disabled: true}),
    })

    this.comentarioFormGroup = new FormGroup({
      comentario: new FormControl('', Validators.required),
    })
   }

  ngOnInit(): void {
    this.inputComentario = false;
    this.inicio = true;
    this.viewing = true;
    this.inputComentario = false;
    this.cuentaService.getCuentasPorAprobar(1).subscribe(res =>{
      console.log(res);  
      if(res.length != 0){
        this.dataSource.data= res
      }else{
       // Swal.fire("Cuentas no econtradas",  `Lo sentimos, pero no se encontraron cuentas para aprobar.`,'warning');
        this.dataSource.data = []
      }    
      

    })
  }

  applyFilter(event: Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  verDetalle(item: CuentaInterface){
    console.log(item);
    this.inicio = false;
    this.viewing= false;
    this.generalFormGroup.patchValue({
      idVenta: item.idCuentaCorriente,
      peso: item.peso,
      parcialidades: item.cantidad,
      agricultor: item.agricultor
    })

    const dataVehiculo: VehiculosAsignados [] = item.vehiculos
    const dataV= dataVehiculo.map(element => {return element.detalleVehiculo!});    
    this.dataSource2.data = dataV;
    
    const dataTransportista= dataVehiculo.flatMap(element =>{ return element.transportistas!});
    this.dataSource3.data = dataTransportista;
  }
  rechazar(){
    this.comentarioFormGroup.reset()
    this.inputComentario = true;
    this.tipoOperacion = 3

  }

  correcciones(){
    this.comentarioFormGroup.reset()
    this.inputComentario = true;
    this.tipoOperacion = 2

  }
  
  guardar(tipo: number){
    let operation: number = 0
    if(tipo == 1){
      this.comentarioFormGroup.reset();
      this.inputComentario = false;
      operation = tipo
    }else{
      operation = this.tipoOperacion
    }

    const param: ParamCrearCuenta = {
      idVenta: this.generalFormGroup.get('idVenta')?.value,
      operacion: operation,
      mensaje: this.comentarioFormGroup.get('comentario')?.value
    }
console.log("PARAMETROS", param);

    this.cuentaService.crearCuenta(param).subscribe(res =>{
      console.log(res);
      if(res.aprobado != 0){
        Swal.fire("Creación exitosa",  `Se creo el numero de cuenta ${res.numeroCuenta}. ${res.mensaje}`,'success').then(()=>{
          this.ngOnInit()
        })
        
      }else if(res.correcion != 0){
        Swal.fire("Correción de cuenta",  'Se mando a corregir la cuenta','success').then(()=>{
          this.ngOnInit()
        })
      }else if(res.rechazado != 0){
        Swal.fire("Cuenta Rechazada", 'Se rechazo exitosamente la cuenta','success').then(()=>{
          this.ngOnInit()
        })
      } else{
        this.snack.open('No se pudo agregar al transportista', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
      
    },error => {
      console.log(error);
    });
    
  }

  regresar(){
    this.inicio = true;
    this.viewing = false;
  }

}
