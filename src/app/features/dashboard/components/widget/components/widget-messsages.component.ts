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
      class="flex-1 overflow-y-auto p-3 space-y-2"
      [appScrollBottom]="messages.slice()"
      #messagesContainer
    >
      <app-message-bubble
        *ngFor="let msg of messages"
        [message]="msg"
        (quickReplyClicked)="onQuickReply($event)"
      ></app-message-bubble>
    </div>
  `,
})
export class WidgetMessagesComponent implements AfterViewChecked {
  @Input() messages: Message[] = [];
  @Output() quickReply = new EventEmitter<string>();

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngAfterViewChecked() {
    // Use NgZone + requestAnimationFrame to ensure DOM is updated
    // this.ngZone.runOutsideAngular(() => {
    //   requestAnimationFrame(() => this.scrollToBottom());
    // });
  }

  onQuickReply(reply: string) {
    this.quickReply.emit(reply);
  }

  private scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch {}
  }
}
