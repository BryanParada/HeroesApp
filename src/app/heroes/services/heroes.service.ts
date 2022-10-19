import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from "../interfaces/heroes.interface";
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.ApiEndpoint;
  
  constructor( private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
  return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroesByID( id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
  }

  getSuggestions( termino: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=5`) 
    
  }

  addHero( hero: Hero):Observable<Hero> {
     return this.http.post<Hero>(`${this.baseUrl}/heroes/`, hero)
  }

  updateHero( hero: Hero):Observable<Hero> {
    return this.http.put<Hero>(`${this.baseUrl}/heroes/${ hero.id}`, hero)
 }


}
