import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common-service.service';
import { CountryDetailsModel, CurrencyLangModel } from 'src/app/models/common-models';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  public countryDetails: CountryDetailsModel;
  private querySub;
  public borderCountries: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.querySub = this.route
      .queryParams
      .subscribe(params => {
        this.commonService.getCountryDetails(params.name).subscribe((data: CountryDetailsModel[]) => {
          this.countryDetails = data[0];
          this.getBorderCountries();
        });
      });
  }

  public getCurrenciesLang(arr: CurrencyLangModel[]) {
    return arr.map((e) => e.name).join(',');
  }

  public redirectToPrevPage() {
    const country = this.commonService.popCountryStack();
    if (country) {
      this.redirectToCountry(country, true);
    } else {
      this.commonService.redirectToHome.emit();
      this.router.navigate(['home']);
    }
  }

  public redirectToCountry(name: string, isPrev?: boolean) {
    if (!isPrev) {
      this.commonService.addToCoutryStack(name);
    }
    this.router.navigate(['/details'], { queryParams: { name } });
  }

  private getBorderCountries() {
    if (!this.countryDetails.borders.length) {
      this.commonService.hideLoader();
      return;
    }
    this.commonService.getCountryByCode(this.countryDetails.borders).subscribe((data: any[]) => {
      this.borderCountries = data.map((e) => e.name);
      this.commonService.hideLoader();
    });
  }

}
