import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-place-listing',
  templateUrl: './place-listing.component.html',
  styleUrls: ['./place-listing.component.scss']
})
export class PlaceListingComponent implements OnInit {
  listing$: Observable<any[]>;

  constructor(private googleRequests: RequestsService) { }
  

  ngOnInit(): void {
    this.googleRequests.nearListing.subscribe(res=> {
      if (res.status) {
        this.listing$ = of (res.results);
      }
    });
  }

}
