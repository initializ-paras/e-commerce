import {trigger, transition, style, animate, state} from '@angular/animations';

export const accordionAnimation =
  trigger('expandCollapse', [
    state(
      'collapsed',
      style({
        height: '0',
        overflow: 'hidden',
      })
    ),
    state(
      'expanded',
      style({
        height: '*',
      })
    ),
    transition('collapsed => expanded', animate('200ms ease-out')),
    transition('expanded => collapsed', animate('200ms ease-in')),
  ]);
