import { animate, style, transition, trigger } from '@angular/animations';

export const pageFade = trigger('pageFade', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(14px)' }),
    animate('260ms cubic-bezier(.2,0,0,1)', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);
