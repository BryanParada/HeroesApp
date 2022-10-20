import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL:String = environment.ApiEndpoint;


  constructor( private http:HttpClient,
               ) { }

  loginService(){
      return this.http.get<Auth>(`${this.baseURL}/usuarios/1`);
  }
}
