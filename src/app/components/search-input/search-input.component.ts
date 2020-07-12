import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})

export class SearchInputComponent implements OnInit {
  @Input() adressType: string;
  @Input() isDetails: boolean;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  map: object;
  autocompleteInput: string;

  lat: number;
  long: number
  constructor(private shareData: SharedService, private googleRequests: RequestsService) { }

  ngOnInit(): void {
    this.shareData.Map.subscribe(res => {
      if (Object.keys(res).length !== 0) {
        this.lat = res.center.lat();
        this.long = res.center.lng();
      }
    })
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement);   
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.invokeEvent(place);
        this.googleRequests.googleFindPlaces(place.name, this.lat, this.long);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
}
