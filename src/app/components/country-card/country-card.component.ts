import { Component, OnInit, Input } from '@angular/core';
import { CountryListingModel } from 'src/app/models/common-models';
import { CommonService } from 'src/app/services/common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent implements OnInit {
  @Input()
  public country: CountryListingModel;

  constructor(
    private commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public openCountryDetails() {
    this.commonService.showLoader();
    this.commonService.saveState();
    this.commonService.addToCoutryStack(this.country.name, true);
    this.router.navigate(['/details'], {queryParams: {name: this.country.name}});
  }

}
