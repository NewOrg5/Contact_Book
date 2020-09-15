import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apikey='4dad4a2c88d4f3aa6631981acbf63343'
  constructor(public http:HttpClient) { }

  // getCountryDetails(){
  //  let url =
  //   "https://battuta.medunes.net/api/country/all/?key=" +
  //   this.apikey +
  //   "&callback=?";
  //   return this.http.get(url)
  // }
}
