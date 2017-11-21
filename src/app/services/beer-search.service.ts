import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {BeerResponse} from '../models/beer-response';

@Injectable()
export class BeerSearchService {

  constructor(private http: HttpClient) {
  }

  getBeersForStyle(styleId: number): Observable<BeerResponse> {
    return this.http.get(`${environment.api_url}/beers?styleId=${styleId}`)
      .map(res => {
        return res as BeerResponse;
      })
      .catch((e: any) => Observable.throw(e));
  }

  getBeersForStyleAndName(styleId: number, name: string): Observable<BeerResponse> {
    return this.http.get(`${environment.api_url}/beers?styleId=${styleId}&name=${name}`)
      .map(res => {
        return res as BeerResponse;
      })
      .catch((e: any) => Observable.throw(e));
  }

  getBeersForStyleAndPageNumber(styleId: number, page: number): Observable<BeerResponse> {
    return this.http.get(`${environment.api_url}/beers?styleId=${styleId}&p=${page}`)
      .map(res => {
        return res as BeerResponse;
      })
      .catch((e: any) => Observable.throw(e));
  }

}
