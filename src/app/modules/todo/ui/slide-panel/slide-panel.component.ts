import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slide-panel',
  standalone: true,
  imports: [],
  templateUrl: './slide-panel.component.html',
  styleUrl: './slide-panel.component.scss',
  animations: [
    trigger('fadeSlideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SlidePanelComponent {
  @Input() isOpen = false;
  @Input() headerTitle = 'Slide Panel Header';

  @Output() onClose = new EventEmitter<boolean>();

  onClosePanel() {
    this.onClose.emit(false);
  }
}
