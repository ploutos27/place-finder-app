import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestsService {
  private nearListingSubject: BehaviorSubject<any>;
  public nearListingResponses: Observable<any>;

  constructor(private http: HttpClient) {
    this.nearListingSubject = new BehaviorSubject<any>(Object.assign({}));
    this.nearListingResponses = this.nearListingSubject.asObservable();
  }

  // return observable as public
  public get nearListing() {
    return this.nearListingSubject.asObservable();
  }

  // get near place (random type since)
  googleNearSearch(lat: number, lng: number, type: string) {
    this.http.get(environment.proxy + environment.googleEndPoint + 'nearbysearch/json?location=' + lat + ',' + lng + '&radius=1000&type=' + type + '&key=' + environment.googlePlaceKey).subscribe(res => {
      this.nearListingSubject.next(res);
      }, error => {
        console.log('Error: ' + error)
      });
  }

  googleImagePlaceHolder(img_ref: string) {
    return this.http.get(environment.proxy + environment.googleEndPoint + 'photo?maxheight=200&photoreference=' + img_ref + '&key=' + environment.googlePlaceKey);
  }

  googleGetPlaceDetails(id: string) {
    return this.http.get(environment.proxy + environment.googleEndPoint + 'details/json?place_id='+ id +'&key=' + environment.googlePlaceKey);
  }
}
