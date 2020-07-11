import { Component, OnInit } from '@angular/core';
import { RequestsService } from './services/requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private googleRequests: RequestsService) {}

  ngOnInit(): void {  
    this.googleRequests.googleNearSearch(35.185566,33.382275, 'restaurant');
  }

}
