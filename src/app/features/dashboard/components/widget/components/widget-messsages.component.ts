// widget-messages.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBubbleComponent } from './message-bubble.component';
import { ScrollBottomDirective } from '../../../../../shared/directives/app-scroll-to-Bottom.directive';

@Component({
  selector: 'app-widget-messages',
  standalone: true,
  imports: [CommonModule, MessageBubbleComponent, ScrollBottomDirective],
  template: `
    <div
      class="h-full overflow-y-auto p-3 space-y-2"
      [appScrollBottom]="messages"
      (atBottomChange)="atBottom = $event"
      #scrollToBottomDirective="appScrollBottom"
    >
      <app-message-bubble
        *ngFor="let msg of messages"
        [message]="msg"
        (quickReplyClicked)="onQuickReply($event)"
      ></app-message-bubble>

      <!-- Scroll to bottom button -->
      <!-- Scroll to bottom button with tooltip -->
      <div *ngIf="!atBottom" class="absolute bottom-20 right-4 group z-10">
        <button
          class="px-3 py-2
          bg-emerald-500 hover:bg-emerald-600
 text-white text-sm rounded-full shadow-lg
           hover:bg-blue-600 transition cursor-pointer"
          (click)="scrollToBottomDirective.scrollToBottom()"
        >
          ↓
        </button>

        <!-- Tooltip -->
        <span
          class="absolute right-full top-1/2 -translate-y-1/2 mr-2
           opacity-0 group-hover:opacity-100
           bg-gray-800 text-white text-xs rounded-md
           px-2 py-1 whitespace-nowrap
           transition-opacity duration-200 pointer-events-none"
        >
          Scroll to bottom
        </span>
      </div>
    </div>
  `,
})
export class WidgetMessagesComponent {
  @Input() messages: Message[] | null = [];
  @Output() quickReply = new EventEmitter<string>();

  atBottom = true;

  constructor(private ngZone: NgZone) {}

  onQuickReply(reply: string) {
    this.quickReply.emit(reply);
  }
}
