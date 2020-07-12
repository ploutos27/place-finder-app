import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  private mapSubject: BehaviorSubject<any>;
  public mapResponses: Observable<any>;
  
  private indexSubject: BehaviorSubject<any>;
  public indexResponses:  Observable<any>;

  constructor() {
    this.mapSubject = new BehaviorSubject<any>(Object.assign({}));
    this.mapResponses = this.mapSubject.asObservable();

    this.indexSubject = new BehaviorSubject<any>({});
    this.indexResponses = this.indexSubject.asObservable();

   }

    public get Map() {
      return this.mapSubject.asObservable();
    }


    changeIndexOnHover(index: number) {
      this.indexSubject.next(index);
    }

    loadMap(map: object) {
      this.mapSubject.next(map);
    }
}
