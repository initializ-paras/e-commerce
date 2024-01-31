import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse && (httpErrorResponse.status === 404)) {
          this.router.navigateByUrl('/error');
        }
        if (httpErrorResponse &&
          (httpErrorResponse.status === 401 || httpErrorResponse.status === 400)) {
          throw httpErrorResponse.error;
        }
        return throwError(() => new Error(httpErrorResponse.message));
      }));
  }
}
