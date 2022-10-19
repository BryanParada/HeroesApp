import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
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

  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  save(){
    if(this.hero.superhero.trim().length === 0) {return;}
    
    this.heroesService.addHero(this.hero)
        .subscribe(resp =>{
          console.log('Respuesta', resp);
          
        });

  }

}
