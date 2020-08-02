import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showLoader = true;

  constructor(
    private commonService: CommonService,
    private router: Router
  ) {
    this.upadateLoaderStatus();
  }

  ngOnInit() {
    this.commonService.clearState();
    this.router.navigateByUrl('home');
  }

  private upadateLoaderStatus() {
    this.commonService.changeLoaderStatus.subscribe(
      (status: boolean) => {
        this.showLoader = status;
      }
    );
  }

}
