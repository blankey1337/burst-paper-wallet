import {Injectable} from '@angular/core';
import {Api, ApiSettings, composeApi} from '@burstjs/core';


import { constants } from './constants';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public api: Api;
  public nodeUrl: string;

  constructor() {
    this.nodeUrl = constants.NODE_URL;
    const apiSettings = new ApiSettings(this.nodeUrl);
    this.api = composeApi(apiSettings);
  }

}
