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
        Swal.fire("Cuentas no encontradas",  `Lo sentimos, pero no se encontraron parcialidades para pesar.`,'warning').then(()=>{
          this.dataSource.data = []
        })
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
        Swal.fire("Pesaje Exitoso",  res.mensaje,'success').then(()=>{
          
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
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const document = printWindow.document;
      document.write(`
        <html>
          <head>
            <title>Boleta Pesaje</title>
            <style>
              body {
                margin: 0;
                font-family: Roboto, "Helvetica Neue", sans-serif;
                background: #f5f5f5;
                text-align: center;
              }
  
              .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
              }
  
              .form {
                max-width: 600px;
                padding: 20px;
                background: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                margin-top: 20px;
                text-align: left;
              }
  
              .form label {
                font-weight: bold;
                display: inline-block;
                width: 200px;
              }
  
              .form p {
                margin-top: 10px;
              }
  
              .logo {
                margin-bottom: 20px;
              }
  
              .logo img {
                max-width: 100%;
              }
            </style>
          </head>
          <body>
            <div class="container">
            <!--  
            <div class="logo">
              <img src="../../../../assets/login.png" alt="Logo">
              </div>  -->
              <div class="form">
                <p><label>Número de Boleta:</label> ${this.boletaFormGroup.get('idBoleta')?.value}</p>
                <p><label>ID Parcialidad:</label> ${this.boletaFormGroup.get('idParcialidad')?.value}</p>
                <p><label>Estado Parcialidad:</label> ${this.boletaFormGroup.get('estadoP')?.value}</p>
                <p><label>Número Cuenta:</label> ${this.boletaFormGroup.get('noCuenta')?.value}</p>
                <p><label>Estado Cuenta:</label> ${this.boletaFormGroup.get('estadoC')?.value}</p>
                <p><label>Resultado Pesaje:</label> ${this.boletaFormGroup.get('pesaje')?.value}</p>
                <p><label>Licencias Transportistas:</label> ${this.boletaFormGroup.get('licencias')?.value}</p>
                <p><label>Placa Vehículo:</label> ${this.boletaFormGroup.get('placa')?.value}</p>
                <p><label>Tipo Vehículo:</label> ${this.boletaFormGroup.get('tipo')?.value}</p>
                <p><label>Usuario Pesaje:</label> ${this.boletaFormGroup.get('usuario')?.value}</p>
              </div>
            </div>
          </body>
        </html>
      `);
      document.close();
      printWindow.print();
    }
  }
}
