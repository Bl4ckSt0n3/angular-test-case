import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private productDataObs$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  changeData = this.productDataObs$.asObservable();

  // holding data in function
  setDataObs(data: any) {
    this.productDataObs$.next(data);
  }

  // return data
  getData(){
    return this.productDataObs$.value;
  }
  constructor() { }
}
