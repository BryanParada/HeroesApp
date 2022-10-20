import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


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

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroesByID(id))
      )
      .subscribe(hero => {
        this.hero = hero;
        // console.log(id);

      });



  }

  saveHero() {
    if (this.hero.superhero.trim().length === 0) { return; }

    if (this.hero.id) {
      //actualizar
      this.heroesService.updateHero(this.hero)
        .subscribe(resp => {
          console.log('Updated', resp);
          this.showSnackBar('The Hero Has Been Updated')
        });
    } else {
      //guardar
      this.heroesService.addHero(this.hero)
        .subscribe(hero => {
          // console.log('Response', resp); 
          this.router.navigate(['/heroes/editar', hero.id])
          this.showSnackBar('The Hero Has Been Created')
        });

    }

  }

  deleteHero() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: "250px",
      data: this.hero //--> esta info ira a confirmar.component

    });
    //  {...this.hero} 215

    dialog.afterClosed()
      .subscribe(
        (result) => {
          if (result) {


            this.heroesService.deleteHero(this.hero)
              .subscribe(resp => {
                this.router.navigate(['/heroes']);
                this.showSnackBar('The Hero Has Been Removed')
              });


          }

        }
      )


  }

  actualizaIMG(event: any) {

    console.log('Hola Mundo');
    this.dummy = 1;

  }

  showSnackBar(mensaje: string) {

    this.snackBar.open(mensaje, 'Close', {
      duration: 2500
    })

  }

}
