import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationBarService {
  public isMenuOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isBasketOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isMenuOpen$: Observable<boolean> = this.isMenuOpenSubject.asObservable();
  isBasketOpen$: Observable<boolean> = this.isBasketOpenSubject.asObservable();

  toggleFeature(subject: BehaviorSubject<boolean>): void {
    subject.next(!subject.value);
    this.updateBodyOverflowClass();
  }

  updateBodyOverflowClass(): void {
    const body = document.body!;
    if (body.classList.contains('overflow-y-auto')) {
      body.classList.replace('overflow-y-auto', 'overflow-y-hidden');
    }
    else if (body.classList.contains('overflow-y-hidden')) {
      body.classList.replace('overflow-y-hidden', 'overflow-y-auto');
    }
  }
}
