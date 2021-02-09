import { environment } from 'src/environments/environment.prod';
import { ClientMessage } from './../../models/client-message-model/client-message-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public managerId: number = 0;
  constructor(private client: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*/*',
      // 'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE',
      // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type',
    }),
  };
  //This method will retrieve the manger ID associated with the email address provided.
/*   storeManagerIdFromServer(email: string) {
    console.log('In MangerID retriever! ' + 'Email is: ' + email);
    console.log(`${environment.BASE_URL}getmanager`);
    this.client
      .post<ClientMessage>(
        `${environment.BASE_URL}getmanager`,
        new ClientMessage(email),
        this.httpOptions
      )
      .subscribe((data) => {
        this.managerId = parseInt(data.message);
        sessionStorage.setItem('managerId', JSON.stringify(this.managerId));
        console.log(sessionStorage.getItem('managerId'));
        console.log('Manager ID: ' + this.managerId);
      });
  } */

  storeManagerIdFromServer(email: string) {
    console.log('In MangerID retriever! ' + 'Email is: ' + email);
    console.log(`${environment.BASE_URL}getmanager`);

    this.postManager(email).subscribe(
      response => {
        this.managerId = parseInt(response.message);
        sessionStorage.setItem('managerId', JSON.stringify(this.managerId));
        console.log(sessionStorage.getItem('managerId'));
        console.log('Manager ID: ' + this.managerId);
      }
    );
  }

  postManager(email: string): Observable<ClientMessage> {
    return this.client.post<ClientMessage>(`${environment.BASE_URL}getmanager`, new ClientMessage(email), this.httpOptions);
  }


}
