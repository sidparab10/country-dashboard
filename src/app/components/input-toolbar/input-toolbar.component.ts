import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common-service.service';
import { RegionListModel } from 'src/app/models/common-models';

@Component({
  selector: 'app-input-toolbar',
  templateUrl: './input-toolbar.component.html',
  styleUrls: ['./input-toolbar.component.scss']
})
export class InputToolbarComponent implements OnInit {
  public allRegions: string[] = [];
  public selectedOption = 'all';
  public searchVal = '';

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getRegionList();
    this.commonService.savePageState.subscribe(this.saveInputState.bind(this));
    this.commonService.redirectToHome.subscribe(this.getPageState.bind(this));
  }

  public getSearchedCountry() {
    // this.commonService.showLoader();
    this.commonService.getFilteredCountryList(this.searchVal);
  }

  public getCountryByRegion() {
    this.commonService.showLoader();
    this.commonService.getCountryByRegion(this.selectedOption);
  }

  private getRegionList() {
    this.commonService.getRegionList().subscribe((data: RegionListModel[]) => {
      this.allRegions = [];
      data.filter((val) => {
        if (val.region && this.allRegions.indexOf(val.region) === -1) {
          this.allRegions.push(val.region);
        }
      });
    });
  }

  private saveInputState() {
    this.commonService.save(this.searchVal, this.selectedOption);
  }

  private getPageState() {
    const state = this.commonService.getState();
    if (state.search || state.region) {
      if (state.search) {
        this.searchVal = state.search;
        this.commonService.getFilteredCountryList(this.searchVal);
      }
      if (state.region) {
        this.selectedOption = state.region;
        this.commonService.getCountryByRegion(this.selectedOption);
      }
    }
  }
}
