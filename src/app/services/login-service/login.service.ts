import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  getManagerId(email: string): Observable<string> {
    return this.httpClient.post<string>(
      `${environment.BASE_URL}manager`,
      email
    );
  }
}
