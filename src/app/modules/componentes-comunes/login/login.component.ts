import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticationInterface, LoginParams } from '../interfaces/usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  generalFormGroup!: FormGroup;
  roles!: string;

  constructor(private loginService: LoginService, 
    private router: Router,
    private snack: MatSnackBar) { 
      this.generalFormGroup =  new FormGroup({
        user: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {}

  login(){
    let user = this.generalFormGroup.get("user")?.value
    let pass = this.generalFormGroup.get("password")?.value
//'bcuser1', 'admin'
    console.log("QUE TRAE: ", user, pass);
    
    this.loginService.login(user, pass).subscribe((response: AutenticationInterface) => {
      const serializedResponse = JSON.stringify(response);
      sessionStorage.setItem('authData', serializedResponse);
      const roles: string[] = response.roles.split(',');

      if(response != null){
        if(roles.find(rol => rol === 'AGRICULTOR_VENTAS' || rol === 'AGRICULTOR_ENVIOS' || rol === 'AGRICULTOR_ADMIN')){
          this.router.navigate(['agricultor']);
        }else{
          this.router.navigate(['cafetito']);
        }
      }else{
        this.snack.open('Acceso Denegado', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    },
    error => {
      console.log(error);
    });    
  }

}
