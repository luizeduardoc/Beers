import { Component, OnInit } from '@angular/core';
import { BeerService } from './beer.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.css']
})
export class BeerComponent implements OnInit {

  beerList : {} = [];
  randomBeer = {};
  randomBeerKeys : any = [];
  randomBeerKeysC : any = [];
  selectedBeer : any;
  favouriteBeers: any = [];
  beerName = '';

  constructor(private beerService : BeerService, private uiLoader : NgxUiLoaderService, private alertService: AlertService) { }

  ngOnInit() {
    
    this.getRandomBeer(1);
    
  }

  addToFavourites() {
    let foundBeer = false;
    // Check if beer is already on the list
    for(let beer of this.favouriteBeers) {
      if(beer['id'] == this.randomBeer['id']) {
        foundBeer = true;
      }
    }
    if(!foundBeer) {
      this.favouriteBeers.push(this.randomBeer);
      this.alertService.success('Beer added to favourites!');
    } else {
      this.alertService.danger('Beer already on the list!');
    }
  }

  removeFromFavourites(index) {
    this.favouriteBeers.splice(index, 1);
    this.alertService.warning('Beer removed to favourites!');
  }

  // type 1 - random beer
  // type 0 - recieve search input
  getRandomBeer(type) {
    if(type == 1) {
      this.uiLoader.start();
      this.beerService.getRandomBeer().subscribe(
        res => {
           // Get first position because api returns an array with one position
          this.randomBeer = res[0];
          delete this.randomBeer['boil_volume'];
          this.randomBeerKeys = Object.keys(this.randomBeer);
          console.log(this.randomBeer['image_url']);
        }
      );
      this.uiLoader.stop();
    } else {
      for(let beer of this.favouriteBeers) {
        if(beer['name'] == this.beerName) {
          this.uiLoader.start();
          this.randomBeer = beer;
          this.uiLoader.stop();
        }
      }
    }
  }

}
