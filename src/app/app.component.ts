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
  loading = true;

  // some random location 
  locations: Array<any> = [
    { lat: '34.707130', long: '33.022617'}, // lim
    { lat: '35.185566', long: '33.382275'}, // nic
    { lat: '34.917709', long: '33.636631'}, // lar
    { lat: '34.772015', long: '32.429737'}  // paf
  ];
  // some random categories
  catogories: Array<any> = [
    'Restaurant',
    'School', 
    'Cafe', 
    'Shopping Mall', 
    'Bar', 
    'Bank',
    'Supermarket', 
    'Gym',
    'Gas Station'
  ];

  constructor(private googleRequests: RequestsService, private router: Router,  private shareData: SharedService) {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        if (RegExp('details').test(event.url) ) {
          this.isDetails = true;
          this.id = event.url.replace('/details/', ' ');
        } else {
          this.isDetails = false;
            this.shareData.Map.subscribe(res => {
              if (Object.keys(res).length !== 0) {
                res.setZoom(12);
              }
            });
        }
      }
    });
  }

  ngOnInit() { 
   this.getUserLocation(); 
   this.loading = false;
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
        let loc = this.locations[Math.floor(Math.random() * this.locations.length)];
        this.googleRequests.googleNearSearch(35.126411, 33.429859, this.catogories[Math.floor(Math.random() * this.catogories.length)]);
      });
    }
  }

}
