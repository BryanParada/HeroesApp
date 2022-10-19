import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";
  heroes: Hero[] = [];
  selectedHero!: Hero;

  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  selectedOption(event: MatAutocompleteSelectedEvent){
    const heroe: Hero = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroesByID( heroe.id!)
        .subscribe( heroe => this.selectedHero = heroe)
    
  }

  search(){
    this.heroesService.getSuggestions(this.termino)
    .subscribe(heroes => this.heroes = heroes);

  }

}
