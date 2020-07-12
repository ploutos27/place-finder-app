import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-place-listing',
  templateUrl: './place-listing.component.html',
  styleUrls: ['./place-listing.component.scss']
})
export class PlaceListingComponent implements OnInit {
  listing$: Observable<any[]>;
  thumbnail = environment.googleEndPoint;
  tokenKey = environment.googlePlaceKey;
  paginationToken: string;
  type: string;

  constructor(private googleRequests: RequestsService, private shareData: SharedService) { }
  
  ngOnInit(): void {
    this.googleRequests.nearListing.subscribe(res => {
      if (res.status) {
        this.listing$ = of (res.results);
        this.paginationToken = res.next_page_token;
        this.type = res.type;
      }
    });
  }

  pagination() {
    this.shareData.Map.subscribe(res => {
      console.log(res)
       this.googleRequests.googlePaginatedCurrentData(res.center.lat(),res.center.lng(), this.type, this.paginationToken);
    });
  }

  mouseOver(e) {
    console.log(e)
    this.shareData.changeIndexOnHover(e);
  }


}
