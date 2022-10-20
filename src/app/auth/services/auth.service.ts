import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL:String = environment.ApiEndpoint;
  private _auth: Auth | undefined;

  get auth(): Auth{
    return {...this._auth!}
  }

  constructor( private http:HttpClient,
               ) { }

  loginService(){
      return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
            .pipe(
              //para generar efectos secundarios cuando se realice la peticion, y antes de
              //llegar al subscribe de login.component
              // pasara primero por el sgte tap.
              //informacion de backend se almacenara en variable de tipo interface
              tap( auth => this._auth = auth   ),
              tap( auth => localStorage.setItem("id", auth.id))

            );
  }
}
