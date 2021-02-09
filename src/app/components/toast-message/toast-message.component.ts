import { Component, OnInit } from '@angular/core';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent implements OnInit {


  constructor(public toastService:ToastRelayService) { }

  ngOnInit(): void {
  }

}
