import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationBarService {
  private isMenuOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isMenuOpen$: Observable<boolean> = this.isMenuOpenSubject.asObservable();

  toggleMenu(): void {
    this.isMenuOpenSubject.next(!this.isMenuOpenSubject.value);
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
