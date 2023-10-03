import { trigger, transition, style, animate } from '@angular/animations';

export const sideBarAnimation = trigger('sideBarAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('0.3s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0.3s ease-in', style({ transform: 'translateX(-100%)', opacity: 0 })),
  ]),
]);

export const sideBarBackgroundAnimation = trigger('sideBarBackgroundAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.25s ease-out', style({ opacity: 0.5 })),
  ]),
  transition(':leave', [
    animate('0.25s ease-in', style({ opacity: 0 })),
  ]),
]);
