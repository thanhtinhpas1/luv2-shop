import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetResponseCountries, GetResponseStates } from '.';
import { Country } from '../models/country';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {
  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCreditCardMonths = (startMonth: number): Observable<number[]> => {
    const data: number[] = [];

    // build an array for "Month" dropdown list
    // - start at desired startMonth and loop until 12
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears = (): Observable<number[]> => {
    const data: number[] = [];

    // build an array for "Year" dropdown list
    // - start at current year and loop for next 10
    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }

  getStates = (countryCode: string): Observable<State[]> => {
    const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
      map(data => data._embedded.states),
    );
  }

  getCountries = (): Observable<Country[]> => {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(data => data._embedded.countries)
    );
  }
}
