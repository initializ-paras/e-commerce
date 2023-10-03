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
  }
}
