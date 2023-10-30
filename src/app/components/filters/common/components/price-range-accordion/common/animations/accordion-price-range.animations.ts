import {trigger, transition, style, animate, state} from '@angular/animations';

export const accordionPriceRangeAnimation =
    trigger('rangeErrorFadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 })),
      ]),
    ]);
