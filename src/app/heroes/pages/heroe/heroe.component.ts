import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  id: string = '';

  ngOnInit(): void {
 
    this.route.params
    .subscribe( ({ id }) => console.log( id ));

    // this.route.params
    // .subscribe(
    //   (params: Params) => { 
    //     console.log(params["id"]);
    //   });
      
    
    }
  

}
