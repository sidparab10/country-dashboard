import { strict } from 'assert';
import { HttpParams } from '@angular/common/http';

const api = 'https://restcountries.eu/rest/v2';

export function getApiForCuntryListing(filters: string[]) {
    return {
        api: api + '/all',
        params: createParameter('fields', filters.join(';'))
    };
}

export function getApiForRegionList() {
    return {
        api: api + '/all',
        params: createParameter('fields', 'region')
    };
}

export function getApiForSearchFilter(searchVal: string) {
    return {
        api: api + '/name/' + searchVal
    };
}

export function getApiForCountryByRegion(region: string) {
    return {
        api: api + '/region/' + region
    };
}

export function getApiForCountryDetails(name) {
    return {
        api: api + '/name/' + name,
        params: createParameter('fullText', true)
    };
}

export function getApiForCountryByCode(code: string[]) {
    return {
        api: api + '/alpha',
        params: createParameter('codes', code.join(';'))
    };
}

function createParameter(name, value) {
    return { params: new HttpParams().set(name, value) };
}
