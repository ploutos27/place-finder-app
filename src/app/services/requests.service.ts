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

  // get near place
  googleNearSearch(lat: number, lng: number, type: string) {
    this.http.get(environment.proxy + environment.googleEndPoint + 'nearbysearch/json?location=' + lat + ',' + lng + '&radius=5000&type=' + type + '&key=' + environment.googlePlaceKey).subscribe(res => {
      let data = res;
      data['type'] = type;
      this.nearListingSubject.next(data);
      }, error => {
        console.log('Error: ' + error);
      });
  }

  googlePaginatedCurrentData(lat: number, lng: number, type: string, tokenPaginated: string) {
    this.http.get(environment.proxy + environment.googleEndPoint + 'nearbysearch/json?location=' + lat + ',' + lng + '&radius=5000&type=' + type + '&key=' + environment.googlePlaceKey + '&pagetoken=' + tokenPaginated).subscribe(res => {
      this.nearListingSubject.next(res);
      }, error => {
        console.log('Error: ' + error);
      });
  }

  googleFindPlaces(input: string, lat: number, lng: number) {
    this.http.get(environment.proxy + environment.googleEndPoint + 'textsearch/json?query=' + input + '&location=' + lat + ',' + lng + '&key=' + environment.googlePlaceKey).subscribe(res => {
      this.nearListingSubject.next(res);
    }, error => {
      console.log('Error: ' + error);
    })
  }

  googleGetPlaceDetails(id: string) {
    return this.http.get(environment.proxy + environment.googleEndPoint + 'details/json?place_id='+ id +'&key=' + environment.googlePlaceKey);
  }
}
