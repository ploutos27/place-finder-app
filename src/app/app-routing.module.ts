import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceListingComponent } from './components/place-listing/place-listing.component';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';

const routes: Routes = [
  { path: '', component: PlaceListingComponent },
  { path: 'details/:id', component: PlaceDetailsComponent },
  { path: '**', component: PlaceListingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
