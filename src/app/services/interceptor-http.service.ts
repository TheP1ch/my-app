import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HTTPInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers;
    const token = localStorage.getItem('token');
    headers = headers.append('Authorization', `Bearer ${token}`);
    console.log(req.url);
    const request = req.clone({
      headers,
      url: `${req.url}`,
    });
    return next.handle(request);
  }
}
