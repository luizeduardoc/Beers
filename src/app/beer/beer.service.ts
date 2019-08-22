import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  randomBeer = 'https://api.punkapi.com/v2/beers/random';

  constructor(private http : HttpClient) { }

  getRandomBeer() {
    return this.http.get(this.randomBeer);
  }
  
}
