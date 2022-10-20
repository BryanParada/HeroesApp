import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px;
  }`
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
    id: 'DC Comics',
    desc: 'DC - Comics'
  },
  {
    id: 'Marvel Comics',
    desc: 'Marvel - Comics'
  }
  ]

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''

  }

  dummy: number = 0;

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
        return;
    }
    
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroesByID(id))
    )
    .subscribe( hero =>{
      this.hero = hero;
      // console.log(id);
      
    } ); 

  

  }

  saveHero(){
    if(this.hero.superhero.trim().length === 0) {return;}
    
    if(this.hero.id) {
      //actualizar
      this.heroesService.updateHero(this.hero)
      .subscribe(resp =>{
        console.log('Updated', resp);
        
      });
    }else{
      //guardar
      this.heroesService.addHero(this.hero)
      .subscribe(hero =>{
        // console.log('Response', resp); 
        this.router.navigate(['/heroes/editar', hero.id])
      });
 
    }
 
  }

  deleteHero(){

    this.heroesService.deleteHero(this.hero)
        .subscribe( resp => {
          this.router.navigate(['/heroes']);
        } );
  }

  actualizaIMG(event: any){

    console.log('Hola Mundo');
    this.dummy = 1;
    
  }

}
