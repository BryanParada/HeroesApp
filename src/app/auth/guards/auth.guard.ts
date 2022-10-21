import { Injectable, Pipe } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

constructor( private authService: AuthService,
             private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.checkAuthentication() 
                  .pipe(
                    tap( estaAutenticado => {
                      if(!estaAutenticado){
                        this.router.navigate(['./auth/login']);
                      }
                    })
                  )

      // if(this.authService.auth.id)
      // {
      //   return true;
      // } 
      // else
      // {
      //   console.log('Bloqueado por el canActivate'); 
      //   return false;
      // }


  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {


      return this.authService.checkAuthentication()
                .pipe(
                  tap( estaAutenticado => {
                    if(!estaAutenticado){
                      this.router.navigate(['./auth/login']);
                    }
                  })
                )

      // if(this.authService.auth.id)
      // {
      //   return true;
      // } 
      // else
      // {
      //   console.log('Bloqueado por el canLoad'); 
      //   return false;
      // }

      // console.log('can load',false);      
      // console.log(route);
      // console.log(segments);


      
  }
}
