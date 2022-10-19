import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from '../../interfaces/heroes.interface';
import { switchMap, tap} from "rxjs";
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  hero!: Hero; 

  constructor(
    private route: ActivatedRoute,
    private heroesService: HeroesService

    ) { }
 
  ngOnInit(): void {
 
    // this.route.params
    // .subscribe( ({ id }) => console.log( id ));

    this.route.params
        .pipe(
          switchMap( ({id}) => this.heroesService.getHeroesByID( id ) ),
          tap(console.log)  
        )
        .subscribe( heroe => this.hero = heroe);

    //SWITCH MAP


    // this.route.params
    // .subscribe(
    //   (params: Params) => { 
    //     console.log(params["id"]);
    //   });
      
    
    }
  

}
