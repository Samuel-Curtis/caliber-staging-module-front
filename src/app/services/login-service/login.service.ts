import { environment } from 'src/environments/environment.prod';
import { ClientMessage } from './../../models/client-message-model/client-message-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  managerId: string;

  constructor(private client: HttpClient) {}

  /**
   * Post the manager to the database
   * @param email Manger's email;
   */
  postManager(email: string): Observable<ClientMessage> {
    return this.client.post<ClientMessage>(`${environment.BASE_URL}getmanager`, new ClientMessage(email));
  }
}
