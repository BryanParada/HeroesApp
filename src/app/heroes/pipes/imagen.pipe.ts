import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Hero): string {
 
    return `assets/heroes/${heroe.id}.jpg`
    //return "assets/heroes/" + heroe.id + ".jpg";
  }

}
