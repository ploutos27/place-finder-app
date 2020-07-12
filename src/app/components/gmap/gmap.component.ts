import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})

export class GmapComponent implements OnInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;                                              
  markers: Array<any> = [];
  marker: any;
  lat: number;
  lng: number;
  id: string;
  subscription: Subscription;

  indexForMarker: FormGroup;

  constructor(private googleRequests: RequestsService, private formBuilder: FormBuilder,
    private shareData: SharedService) {

    }
  
  ngOnInit(): void {
    this.indexForMarker = this.formBuilder.group({ index: [''] });
    this.googleRequests.nearListing.subscribe(res=> {
        if (res.status) {
          this.mapInitializer(res);
        }
      });
  }

  mapInitializer(data) {
    for (let i = 0; i < data.results.length; i++) {
      if ( data.results[i].geometry.location ) {
        this.markers.push(new google.maps.Marker({
          position:  new google.maps.LatLng(data.results[i].geometry.location.lat ,data.results[i].geometry.location.lng),
          map: this.map,
          title: `<h3 class="mb-0">${data.results[i].name}</h3>
                    <div class="location">${data.results[i].vicinity}</div>`,
        }));
      }
    }
    
    // default coordinates for map
    const coordinates = new google.maps.LatLng(data.results[0].geometry.location.lat ,data.results[0].geometry.location.lng)
    const mapOptions: google.maps.MapOptions = { 
      center: coordinates,
      zoom: 12,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false   
    }

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    let service = new google.maps.places.PlacesService(this.map);

    this.shareData.loadMap(this.map); // pass map to the share services
    this.markers.forEach(el => {
      var infowindow = new google.maps.InfoWindow({
        content: el.title
      });
      el.setMap(this.map);
      el.addListener('mouseover', () => infowindow.open(this.map, el)); // mouse over
      el.addListener('mouseout', ()=> infowindow.close()); // mouse out 
     
    });

    this.shareData.indexResponses.subscribe(res => {
      if (typeof res === 'number') {
        this.indexForMarker.setValue({ index: res});
        this.markers[res].setIcon(this.highlightedIcon());
        // using formGroup to remember value
        this.indexForMarker.get("index").valueChanges.subscribe(x => {
          this.markers[this.indexForMarker.value.index].setIcon(this.normalIcon());
       });
      }
    });
  }
 
  normalIcon() {
    return {
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg'
    };
  }

  highlightedIcon() {
    return {
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg'
    };
  }

  ngOnDestroy() {
  
  }
}

