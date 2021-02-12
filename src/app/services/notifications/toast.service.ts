import { Injectable } from '@angular/core';
//import { $ } from 'protractor';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private messageSource = new BehaviorSubject('no message');
  typeMessage = this.messageSource.asObservable();
  id: String;

  constructor() { }

  /* 
    Service method used to change the message in the toast
  */
  newMessage(message: string) {
    this.messageSource.next(message);
  }

  summonToast(buttonId: string) {
    // this.id = '#' + buttonId; 
    // $(document).ready(function () {
    //   $(this.id).on( "click", function() {
    //     $(".toast").toast("show");
    //   });
    // });
  }

  callToast(): boolean {
    return true;
  }

  // sendMessageType(type: String): Observable<String> {
    
  //   return
  // }
}
