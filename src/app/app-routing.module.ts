import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListingComponent } from './components/country-listing/country-listing.component';
import { ErrorPageComponent } from './components/common/error-page/error-page.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CountryListingComponent
  },
  {
    path: 'details',
    component: CountryDetailsComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
