import { Component, Input } from '@angular/core';
import { ListadoComponent } from "../../pages/listado/listado.component"; 
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
    mat-card {
      margin-top: 20px;
      
    }
  `
  ]
})
export class HeroeTarjetaComponent {

  @Input()
  hero!: Hero; //otra opcion es declararlo como: hero: Hero | undefined



}
