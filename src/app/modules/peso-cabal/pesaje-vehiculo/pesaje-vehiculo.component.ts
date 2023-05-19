import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehiculoInterface } from 'src/app/modules/componentes-comunes/interfaces/vehiculo.interface';
import { VehiculoService } from 'src/app/modules/componentes-comunes/servicios/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pesaje-vehiculo',
  templateUrl: './pesaje-vehiculo.component.html',
  styleUrls: ['./pesaje-vehiculo.component.css']
})
export class PesajeVehiculoComponent implements OnInit {

  generalFormGroup!: FormGroup;
  vehiculoFormGroup!: FormGroup;
  view!: Boolean;
  pesoFormGroup!: FormGroup

  constructor(private vehiculoService: VehiculoService,
    private snack: MatSnackBar) {
    this.generalFormGroup = new FormGroup({
      placaBusqueda: new FormControl('', Validators.required),
    })

    this.pesoFormGroup = new FormGroup({
      peso: new FormControl('', Validators.required),
    })

    this.vehiculoFormGroup = new FormGroup({
      placa:  new FormControl({value: "", disabled: true}),
      modelo:  new FormControl({value: "", disabled: true}),
      tipo:  new FormControl({value: "", disabled: true}),
      color:  new FormControl({value: "", disabled: true}),
      estado: new FormControl({value: "", disabled: true}),
      usuario: new FormControl({value: "", disabled: true}),
      fecha: new FormControl({value: "", disabled: true}),
      marca: new FormControl({value: "", disabled: true}),
    })
   }

  ngOnInit(): void {
    this.view = false;
    this.pesoFormGroup.reset();
    this.generalFormGroup.reset();
    this.vehiculoFormGroup.reset();
  }

  buscar(){
    const placa: string = this.generalFormGroup.get('placaBusqueda')?.value
    console.log(placa);
    

    this.vehiculoService.findvehculoByPlaca(placa).subscribe(res =>{
      if(res){
        this.view = true;
        this.vehiculoFormGroup.patchValue({
          placa: res.placaVehiculo,
          modelo: res.modeloVehiculo,
          tipo: res.tipoVehiculo,
          color: res.colorVehiculo,
          estado: res.estadoVehiculo,
          usuario: res.usuarioCreacion,
          fecha: res.fechaCreacion,
          marca: res.marcaVehiculo
        })
      }else{
        this.snack.open('No se encontro el vehículo', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })

  }

  cancelar(){
    this.pesoFormGroup.reset();
    this.generalFormGroup.reset();
    this.vehiculoFormGroup.reset();
    this.view = false;
  }

  guardar(){

    /* const vehiculo: VehiculoInterface = {
      pesoVehiculo: this.pesoFormGroup.get('peso')?.value,
      colorVehiculo: this.vehiculoFormGroup.get('color')?.value,
      marcaVehiculo: this.vehiculoFormGroup.get('marca')?.value,
      placaVehiculo: this.vehiculoFormGroup.get('placa')?.value,
      modeloVehiculo: this.vehiculoFormGroup.get('modelo')?.value,
      estadoVehiculo: this.vehiculoFormGroup.get('estado')?.value,
      tipoVehiculo: this.vehiculoFormGroup.get('tipo')?.value,
      usuarioCreacion: this.vehiculoFormGroup.get('usuario')?.value,
      fechaCreacion: this.vehiculoFormGroup.get('fecha')?.value
    } */
    const placa: string = this.generalFormGroup.get('placaBusqueda')?.value
    const peso: number = this.pesoFormGroup.get('peso')?.value

    this.vehiculoService.vehculoPesaje(placa, peso).subscribe(res =>{
      console.log(res);

      if(res){
        Swal.fire(res.titulo,  res.contenido,'success').then(() =>{
          this.ngOnInit()
        });
        
      }else{
        this.snack.open('No se pudo guardar el peso del vehículo', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
      
    })

  }
}
