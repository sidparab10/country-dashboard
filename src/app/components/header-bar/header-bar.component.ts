import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  public currMode = 'light';

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  get isDark() {
    return this.currMode === 'dark';
  }

  public getMode() {
    switch (this.currMode) {
      case 'light': return 'Dark Mode';
      case 'dark': return 'Light Mode';
    }
  }

  public toggleMode() {
    this.currMode = this.currMode === 'dark' ? 'light' : 'dark';
    this.commonService.setThemeMode(this.currMode);
  }
}
