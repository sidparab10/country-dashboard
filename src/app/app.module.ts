import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListingComponent } from './components/country-listing/country-listing.component';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { InputToolbarComponent } from './components/input-toolbar/input-toolbar.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ErrorPageComponent } from './components/common/error-page/error-page.component';
import { LoaderScreenComponent } from './components/common/loader-screen/loader-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CountryListingComponent,
    CountryCardComponent,
    CountryDetailsComponent,
    InputToolbarComponent,
    HeaderBarComponent,
    ErrorPageComponent,
    LoaderScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
