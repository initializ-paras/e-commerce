import {Component, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  animations: [
    trigger('scrollFadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in => out', animate('0.2s ease-in')),
      transition('out => in', animate('0.2s ease-out')),
    ]),
  ],
})

export class ScrollerComponent {
  showScrollButton = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 0.5 * window.innerHeight;
  }

  scrollToTop() : void {
    window.scrollTo(0,0)
  }
}
