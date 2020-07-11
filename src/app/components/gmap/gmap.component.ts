import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})

export class GmapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;                                              
  markers: Array<any> = [];

  marker: any;
  lat: number;
  lng: number;

  constructor(private googleRequests: RequestsService) {}
  
  ngOnInit(): void {
    this.googleRequests.nearListing.subscribe(res=> {
      if (res.status) {
        this.mapInitializer(res)
      }
    });
  }

  mapInitializer(data) {
    for (let i = 0; i < data.results.length; i++) {
      if ( data.results[i].geometry.location ) {
        this.markers.push(new google.maps.Marker({
          position:  new google.maps.LatLng(data.results[i].geometry.location.lat ,data.results[i].geometry.location.lng),
          map: this.map,
          title: data.results[i].name
        }));
      }
    }
    // default coordinates for map
    const coordinates = new google.maps.LatLng(data.results[0].geometry.location.lat ,data.results[0].geometry.location.lng)
    const mapOptions: google.maps.MapOptions = { 
      center: coordinates,
      zoom: 15,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false   
    }

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    var infowindow = new google.maps.InfoWindow({
      content: 'Tetst'
    });

    this.markers.forEach(el => {
      el.setMap(this.map);
      el.addListener('mouseover', () => infowindow.open(this.map, el));  // hover for map
    })
  }
 
  ngAfterViewInit() {

  }

}

