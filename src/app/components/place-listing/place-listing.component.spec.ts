import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceListingComponent } from './place-listing.component';

describe('PlaceListingComponent', () => {
  let component: PlaceListingComponent;
  let fixture: ComponentFixture<PlaceListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
