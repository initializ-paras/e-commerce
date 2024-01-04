import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  requestCount: number = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  execute() {
    this.requestCount++;
    this.spinnerService.show(undefined, {
      bdColor: "rgba(255,255,255, 0.9)",
      size: "default",
      color: "#111111",
      type: "ball-clip-rotate",
      fullScreen: true,
    });
  }

  terminate() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinnerService.hide();
    }
  }
}
