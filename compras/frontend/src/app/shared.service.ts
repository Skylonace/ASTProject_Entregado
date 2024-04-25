import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  idUserSource = new BehaviorSubject("");
  idUserMessage = this.idUserSource.asObservable();
  idProductSource = new BehaviorSubject("");
  idProductMessage = this.idProductSource.asObservable();
  constructor() { }

  public setUserId(id: string) {
    this.idUserSource.next(id);
  }

  public setProductId(id: string) {
    this.idProductSource.next(id);
  }
}
