import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { ActivatedRoute } from '@angular/router';
import { DetailsResponse } from '../../models/details.model';
import { environment } from '../../../environments/environment';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {
  res: DetailsResponse;
  placeholderImage = environment.googleEndPoint;
  key = '&key=' + environment.googlePlaceKey;
  url = 'https://maps.googleapis.com/maps/api/place/photo?maxheight=350&photoreference=';

  constructor(private googleRequests: RequestsService, private route: ActivatedRoute, private shareData: SharedService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.googleRequests.googleGetPlaceDetails(id).subscribe((res: DetailsResponse) => {
      this.res = res;
      this.placeholderImage += 'photo?maxheight=240&photoreference=' + res.result.photos[0].photo_reference + '&key=' + environment.googlePlaceKey;
      // change zoom and set selected place on map
        this.shareData.Map.subscribe(res => {
          if (Object.keys(res).length !== 0) {
            let pt = new google.maps.LatLng(this.res.result.geometry['location'].lat, this.res.result.geometry['location'].lng);
            res.setCenter(pt);
            res.setZoom(19);
          }
  
        },error=> {
            console.log('Error: ' + error);
        });

    },error => {
      console.log('Error: ' + error)
    });
  }


}
