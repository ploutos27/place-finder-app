import { Component, OnInit, ViewChild, ElementRef, Renderer2,  } from '@angular/core';
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
  @ViewChild('loadBtnTrigger', { static: false }) btnTrigger: ElementRef; 

  listing$: Observable<any[]>;
  thumbnail = environment.googleEndPoint;
  tokenKey = environment.googlePlaceKey;
  paginationToken: string;
  type: string;

  public removeEventListener: () => void;

  constructor(private googleRequests: RequestsService, private shareData: SharedService, 
    private renderer: Renderer2,
    private elementRef:ElementRef) { }
  
  ngOnInit(): void {
    // this.googleRequests.nearListing.subscribe(res => {
    //   if (res.status) {
    //     this.listing$ = of (res.results);
    //     this.paginationToken = res.next_page_token;
    //     this.type = res.type;
    //   }
    // });
  }

  pagination() {
    this.shareData.Map.subscribe(res => {
      if (Object.keys(res).length !== 0) { 
        this.callback(res);
      }
    });
  }

  callback(res) {
    this.removeEventListener = this.renderer.listen(this.btnTrigger.nativeElement, 'click', (event) => {
      this.googleRequests.googlePaginatedCurrentData(res.center.lat(),res.center.lng(), this.type, this.paginationToken);
      event.preventDefault();
    });
  }

  mouseOver(e) {
    this.shareData.changeIndexOnHover(e);
  }

  ngAfterViewInit() {
    this.pagination();
  }

  // removing listener
  public ngOnDestroy() {
    this.removeEventListener();
  }


}
