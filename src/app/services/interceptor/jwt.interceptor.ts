import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  jwtSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private fireAuth: AngularFireAuth) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.fireAuth.idToken.pipe(
      switchMap((jwtToken: string) => {
        this.jwtSubject.next(jwtToken);
        return next.handle(this.addAuthorizationToken(req, jwtToken));
      })
    );
  }

  addAuthorizationToken(req: HttpRequest<any>, jwt: string): HttpRequest<any> {
    return req.clone({
      setHeaders: { Authorization: 'Bearer ' + jwt },
    });
  }
}
