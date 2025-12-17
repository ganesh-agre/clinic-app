// message-bubble.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex flex-col"
      [ngClass]="{ 'items-start': message.type === 'bot', 'items-end': message.type === 'user' }"
    >
      <!-- Message bubble -->
      <div
        class="inline-block px-3 py-2 rounded-lg max-w-[70%] text-white break-words"
        [ngClass]="{
          'bg-gray-600': message.type === 'bot',
          'bg-blue-600': message.type === 'user'
        }"
      >
        {{ message.content }}
      </div>

      <!-- Quick replies for bot messages -->
      <div
        *ngIf="message.type === 'bot' && message.quickReplies?.length"
        class="mt-1 flex flex-wrap gap-2"
      >
        <button
          *ngFor="let reply of message.quickReplies"
          class="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
          (click)="quickReplyClicked.emit(reply)"
        >
          {{ reply }}
        </button>
      </div>
    </div>
  `,
})
export class MessageBubbleComponent {
  @Input() message!: Message;
  @Output() quickReplyClicked = new EventEmitter<string>();
}
