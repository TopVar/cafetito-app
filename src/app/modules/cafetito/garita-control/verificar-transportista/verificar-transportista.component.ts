import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransportistaService } from 'src/app/modules/componentes-comunes/servicios/transportista.service';

@Component({
  selector: 'app-verificar-transportista',
  templateUrl: './verificar-transportista.component.html',
  styleUrls: ['./verificar-transportista.component.css']
})
export class VerificarTransportistaComponent implements OnInit {

  autorizado!: Boolean;
  generalFormGroup!: FormGroup

  constructor(private transportistaService: TransportistaService,
    private route: ActivatedRoute) { 
      this.generalFormGroup = new FormGroup({
        licencia: new FormControl({value: "", disabled: true}),
        tipo: new FormControl({value: "", disabled: true}),
        nombre: new FormControl({value: "", disabled: true}),
        tel: new FormControl({value: "", disabled: true}),
        correo: new FormControl({value: "", disabled: true}),
      })
    }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const licencia: string = params.get('licencia')!;
      //const idParcialidad = parseInt(params.get('idParcialidad')!);

      console.log('Licencia:', licencia);
      //console.log('ID Parcialidad:', idParcialidad);

      this.transportistaService.transportistaValidarPermisoIngreso(licencia).subscribe(res =>{
        if(res){
          this.autorizado = true;
          this.generalFormGroup.patchValue({
            licencia: res.licencia,
            tipo: res.tipoLicencia,
            nombre: res.nombre,
            tel: res.telefono,
            correo: res.email
          })
        }
      })
  
      
    });
    
  }

}
