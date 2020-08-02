import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CountryListingModel, SaveStateModel } from '../models/common-models';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  getApiForCuntryListing,
  getApiForRegionList,
  getApiForSearchFilter,
  getApiForCountryByRegion,
  getApiForCountryDetails,
  getApiForCountryByCode
} from '../constants/api-constants';
import { APP_CONSTANTS } from '../constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public changeLoaderStatus: EventEmitter<boolean> = new EventEmitter();
  public getCountryListing: EventEmitter<CountryListingModel[]> = new EventEmitter();
  public savePageState: EventEmitter<void> = new EventEmitter();
  public redirectToHome: EventEmitter<void> = new EventEmitter();
  private countryStack: string[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.resetCountryStack();
    this.setThemeMode('light');
  }

  public setThemeMode(mode: string) {
    document.body.setAttribute('class', mode);
  }

  public showLoader() {
    this.changeLoaderStatus.emit(true);
  }

  public hideLoader() {
    setTimeout(() => {
      this.changeLoaderStatus.emit(false);
    }, 500);
  }

  public getRegionList() {
    const apiData = getApiForRegionList();
    return this.http.get(apiData.api, apiData.params);
  }

  public getFilteredCountryList(searchVal?: string) {
    if (searchVal) {
      this.searchedFilter(searchVal);
    } else {
      this.allCountryList();
    }
  }

  public getCountryByRegion(region: string) {
    const apiData = getApiForCountryByRegion(region);
    if (region === 'all') {
      this.allCountryList();
    } else {
      this.http.get(apiData.api).toPromise().then(this.emitCountryListingData.bind(this));
    }
  }

  public getCountryDetails(name) {
    const apiData = getApiForCountryDetails(name);
    return this.http.get(apiData.api, apiData.params);
  }

  public getCountryByCode(code: string[]) {
    const apiData = getApiForCountryByCode(code);
    return this.http.get(apiData.api, apiData.params);
  }

  public saveState() {
    this.savePageState.emit();
  }

  public getState(): SaveStateModel {
    return JSON.parse(window.localStorage.state);
  }

  public save(seachVal, regionCombo) {
    window.localStorage.state = JSON.stringify({
      search: seachVal,
      region: regionCombo
    });
  }

  public clearState() {
    window.localStorage.state = JSON.stringify({
      search: '',
      region: ''
    });
  }

  public addToCoutryStack(name: string, isFirst?: boolean) {
    if (isFirst) {
      this.countryStack = [];
    }
    this.countryStack.push(name);
    window.localStorage.countryStack = JSON.stringify(this.countryStack);
  }

  public popCountryStack() {
    this.countryStack = JSON.parse(window.localStorage.countryStack);
    this.countryStack.pop();
    window.localStorage.countryStack = JSON.stringify(this.countryStack);
    return this.countryStack.length ? this.countryStack[this.countryStack.length - 1] : undefined;
  }

  private resetCountryStack() {
    this.countryStack = [];
    window.localStorage.countryStack = JSON.stringify(this.countryStack);
  }

  private searchedFilter(searchVal: string) {
    const apiData = getApiForSearchFilter(searchVal);
    this.http.get(apiData.api).toPromise().then(this.emitCountryListingData.bind(this)).catch(() => {
      // emit blank list for search error
      this.getCountryListing.emit([]);
    });
  }

  private allCountryList() {
    const apiData = getApiForCuntryListing(APP_CONSTANTS.countryListingParamList);
    this.http.get(apiData.api, apiData.params).subscribe(this.emitCountryListingData.bind(this));
  }

  private emitCountryListingData(data) {
    this.getCountryListing.emit(data);
  }
}
