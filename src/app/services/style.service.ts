import {Style} from '../models/style';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class StyleService {

  constructor(private http: HttpClient) {
  }

  getStyles(): Observable<Style[]> {
    return this.http.get(`${environment.api_url}/styles`)
      .map(res => {
        return res as Style[];
      })
      .catch((e: any) => Observable.throw(e));
  }

}
