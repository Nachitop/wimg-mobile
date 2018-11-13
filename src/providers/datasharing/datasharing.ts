import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/*
  Generated class for the DatasharingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatasharingProvider {
  private someDataSource = new BehaviorSubject(null);

  currentSomeDataChanges = this.someDataSource.asObservable();
  constructor(public http: HttpClient) {
    
  }
  someDataChanges(data) {
    this.someDataSource.next(data);
  }
}
