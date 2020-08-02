import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonService } from 'src/app/services/common-service.service';
import { CountryListingModel } from 'src/app/models/common-models';

@Component({
  selector: 'app-country-listing',
  templateUrl: './country-listing.component.html',
  styleUrls: ['./country-listing.component.scss']
})
export class CountryListingComponent implements OnInit, AfterViewInit {
  public countryListing: CountryListingModel[] = [];

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    // as
  }

  ngAfterViewInit() {
    this.commonService.getCountryListing.subscribe((data) => {
      this.countryListing = data;
      this.commonService.hideLoader();
    });
    const state = this.commonService.getState();
    if (!(state.search || state.region)) {
      this.commonService.showLoader();
      this.commonService.getFilteredCountryList();
    }
  }

}
