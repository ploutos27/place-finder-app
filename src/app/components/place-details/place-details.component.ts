import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {

  constructor(private googleRequests: RequestsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.googleRequests.googleGetPlaceDetails(id).subscribe(res => {
      console.log(res)
    },error => {
      console.log('Error: ' + error)
    });
  }

}
