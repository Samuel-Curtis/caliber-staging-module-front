import { Injectable } from '@angular/core';
import { ToastBox } from 'src/app/components/toast-message/toast-message.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastRelayService {
  toasts: ToastBox[] = [];

  constructor() {}

  /**
   * Constrcuts a new toast message adding it to the toasts array, making adjustments to the
    size of the array if the length is exceeded. 
   * @param toast 
   */
  addToast(toast:ToastBox){
    console.log(`Adding toast. Current Toast length = ${this.toasts.length}`);
    if(this.toasts.length > 3){
      this.toasts.shift();
      console.log(`Too much toast! New length = ${this.toasts.length}`);
    } 
    this.toasts.push(toast);
    console.log(`Toast added. Current Toast length = ${this.toasts.length}`);
  }

  //TODO remove is not called on hide
  /**
   * removes a toast message 
   * @param toast 
   */
  remove(toast) {
    console.log(`Removing toast. Toast length = ${this.toasts.length}`);
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
