import { Component, OnInit, Output } from '@angular/core';
import { RequestsService } from './services/requests.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isDetails: boolean;
  id: string;
  title = 'place-finder-app';
  lat: number = 35.1264;
  lng: number = 33.4299;

  constructor(private googleRequests: RequestsService, private router: Router,  private shareData: SharedService) {
    // watch router changes
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        if (RegExp('details').test(event.url) ) {
          this.isDetails = true;
          this.id = event.url.replace('/details/', ' ');
        } else {
          this.isDetails = false;
            this.shareData.Map.subscribe(res => {
              if (Object.keys(res).length !== 0) {
                res.setZoom(12); // set zoom back to normal
              }
            });
        }
      }
    });
  }

  ngOnInit() { 
    
   //this.getUserLocation(); 
  }

  returnLocations(locations: object) {
    this.googleRequests.googleNearSearch(locations['latitude'],locations['longitude'], 'all');
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        let longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.returnLocations({longitude,latitude})
      },error=> {
       // this.googleRequests.googleNearSearch(35.095192,33.203430, 'all'); // if user not use location get cyprus locations and all categories
      });
    }
  }

}
