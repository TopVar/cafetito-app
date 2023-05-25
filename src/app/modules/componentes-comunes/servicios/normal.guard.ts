import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {

  constructor(private router: Router){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(route.url[0].path.match('transportista') && route.url[1].path.match('validacion') && !sessionStorage.getItem("authData")){        
        sessionStorage.setItem("redireccion",state.url)
        
        if(sessionStorage.getItem('redireccion')){
          
          this.router.navigateByUrl('/login');
          return false;
        }      

      }
      
      if(!sessionStorage.getItem("authData")/*  && route.url[0].path.match('cafetito') && route.url[0].path.match('pesocabal') */){
        this.router.navigate(['/login']);
        return false;
      }

      const usuario = JSON.parse(sessionStorage.getItem("authData")!)
      const roles = usuario.roles.split(",")
      
      const cafetitoRol = ['CAFETITO_CREAR_CUENTA', 'CAFETITO_AUTORIZAR_INGRESO', 'CAFETITO_ADMIN', 'CAFETITO_PESO_CABAL']
      
      if(roles.includes("CAFETITO_PESO_CABAL") &&  route.url[0].path.match('pesocabal')){
        return true;  
      }

      if(route.url[0].path.match('transportista') && route.url[1].path.match('validacion') && roles.includes("CAFETITO_AUTORIZAR_INGRESO")){
        
        return true;
      }

      if(route.url[0].path.match('cafetito') && roles.some((role: string) => cafetitoRol.includes(role))){

        
        return true;
      }
      

      this.router.navigate(['/login']);
      return false;


  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
   }
  
}
