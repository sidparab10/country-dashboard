export class ApiRequestModel {
    public api: string;
    public param: any;
}

export class CountryListingModel {
    public name: string;
    public population: number;
    public region: string;
    public capital: string;
    public flag: string;
}

export class RegionListModel {
    public region: string;
}

export class CountryDetailsModel extends CountryListingModel {
    public nativeName: string;
    public subregion: string;
    public topLevelDomain: string[];
    public currencies: CurrencyLangModel[];
    public languages: CurrencyLangModel[];
    public borders: string[];
}

export class CurrencyLangModel{
    public name: string;
}

export class SaveStateModel {
    public search: string;
    public region: string;
}
