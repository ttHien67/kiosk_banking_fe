import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private dataSubject = new BehaviorSubject<any>('Initial Value');

  data$: Observable<any> = this.dataSubject.asObservable();

  updateData(newData: any) {
    this.dataSubject.next(newData);
  }

  speakNotification = new EventEmitter();
  
}