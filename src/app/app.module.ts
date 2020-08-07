import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Material Modules
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Components
import { GmapComponent } from './components/gmap/gmap.component';
import { PlaceListingComponent } from './components/place-listing/place-listing.component';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './components/loader/loader.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    GmapComponent,
    PlaceListingComponent,
    PlaceDetailsComponent,
    SearchInputComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,MatSidenavModule,
    MatButtonModule,MatIconModule, MatFormFieldModule, MatInputModule,
    HttpClientModule,NgbModule, MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAUbWvPy2HiZ6HqBcY5HOaq5rlsAQkhsTA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
