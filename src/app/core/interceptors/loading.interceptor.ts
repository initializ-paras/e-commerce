import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {delay, finalize, Observable, take, tap, timer} from 'rxjs';
import {LoadingService} from "../services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.execute();

    return next.handle(request).pipe(
      delay(450),
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            timer(500).pipe(
              take(1),
              finalize(() => this.loadingService.terminate())
            ).subscribe();
          }
        },
        (error) => {
          this.loadingService.terminate();
        },
      ),
    );
  }
}
