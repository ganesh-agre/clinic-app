import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';
import { ScrollBottomDirective } from '../../../../../shared/directives/app-scroll-to-Bottom.directive';

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, FormsModule, ScrollBottomDirective],
  template: ` <!-- CENTER: Chat Window -->
    <section class="chat">
      <ng-container *ngIf="selectedConversation$ | async as selectedConversation; else emptyState">
        <div class="chat-header">
          <h3>{{ selectedConversation.name }}</h3>
        </div>

        <div class="chat-messages-wrapper">
          <div
            class="chat-messages"
            [appScrollBottom]="messages$ | async"
            (atBottomChange)="atBottom = $event"
            #scrollToBottomDirective="appScrollBottom"
          >
            <div class="message" *ngFor="let m of messages$ | async" [class.me]="m.from === 'me'">
              {{ m.text }}
            </div>
          </div>
          <button
            *ngIf="!atBottom"
            class="scroll-btn"
            (click)="scrollToBottomDirective.scrollToBottom()"
          >
            ↓ To Bottom
          </button>
        </div>
        <div class="chat-input">
          <input
            type="text"
            placeholder="Type a message"
            [(ngModel)]="draft"
            (keydown)="onKeyPress($event)"
          />
          <button (click)="send()">Send</button>
        </div>
      </ng-container>

      <ng-template #emptyState>
        <div class="empty-state">Select a conversation to start chatting</div>
      </ng-template>
    </section>`,
  styles: [
    `
      /* CHAT */
      .chat {
        display: flex;
        flex-direction: column;
        background: #f9fafb;
        height: 580px;
      }

      .chat-header {
        flex: 0 0 auto; /* fixed height */
        padding: 12px;
        border-bottom: 1px solid #e5e7eb;
        background: white;
      }

      .chat-messages-wrapper {
        flex: 1 1 auto; /* flexible height */
        overflow-y: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
      }

      .chat-messages {
        padding: 12px;
        overflow-y: auto;
        position: relative;
        flex: 1 1 auto; /* flexible height */
      }

      .scroll-btn {
        position: absolute;
        bottom: 5%;
        right: 5%;
        z-index: 10;
      }

      .message {
        max-width: 60%;
        padding: 8px 12px;
        margin-bottom: 8px;
        background: white;
        border-radius: 8px;
      }

      .message.me {
        margin-left: auto;
        background: #3b82f6;
        color: white;
      }

      .chat-input {
        flex: 0 0 auto; /* fixed height */
        display: flex;
        padding: 10px;
        background: white;
        border-top: 1px solid #e5e7eb;
      }

      .chat-input input {
        flex: 1;
        padding: 8px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
      }

      .chat-input button {
        margin-left: 8px;
        padding: 8px 12px;
        background: #3b82f6;
        color: white;
        border-radius: 4px;
        border: none;
        cursor: pointer;
      }

      /* EMPTY */
      .empty-state {
        margin: auto;
        color: #6b7280;
      }
    `,
  ],
})
export class ChatWindowComponent {
  draft = '';
  atBottom = true;
  messages$!: Observable<any[]>;
  selectedConversation$!: Observable<any | null>;
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages$ = this.messageService.getMessages();
    this.selectedConversation$ = this.messageService.getSelectedConversation();
  }

  send() {
    if (!this.draft.trim()) return;
    this.messageService.sendMessage(this.draft.trim());
    this.draft = '';
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
}
