import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';
import { ScrollBottomDirective } from '../../../../../shared/directives/app-scroll-to-Bottom.directive';

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, FormsModule, ScrollBottomDirective],
  template: `
    <!-- CENTER: Chat Window -->
    <section class="chat flex flex-col h-[570px] bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <ng-container *ngIf="selectedConversation$ | async as selectedConversation; else emptyState">
        <!-- HEADER -->
        <div class="chat-header flex-none p-3 border-b border-gray-700 bg-gray-800">
          <h3 class="text-gray-100 font-semibold">{{ selectedConversation.name }}</h3>
        </div>

        <!-- MESSAGES -->
        <div class="chat-messages-wrapper flex-1 relative flex flex-col overflow-hidden">
          <div
            class="chat-messages flex-1 overflow-y-auto p-3"
            [appScrollBottom]="messages$ | async"
            (atBottomChange)="atBottom = $event"
            #scrollToBottomDirective="appScrollBottom"
          >
            <div
              class="message max-w-[60%] mb-2 px-3 py-2 rounded-lg break-words"
              *ngFor="let m of messages$ | async"
              [ngClass]="{
                'bg-gray-700 text-gray-100 ml-0': m.from !== 'me',
                'bg-blue-600 text-white ml-auto': m.from === 'me'
              }"
            >
              {{ m.text }}
            </div>
          </div>

          <button
            *ngIf="!atBottom"
            class="scroll-btn absolute bottom-4 right-4 px-3 py-1 bg-blue-500 text-white text-sm rounded shadow hover:bg-blue-600 transition"
            (click)="scrollToBottomDirective.scrollToBottom()"
          >
            ↓ To Bottom
          </button>
        </div>

        <!-- INPUT -->
        <div class="chat-input flex-none flex p-3 border-t border-gray-700 bg-gray-800">
          <input
            type="text"
            placeholder="Type a message"
            [(ngModel)]="draft"
            (keydown)="onKeyPress($event)"
            class="flex-1 px-3 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            (click)="send()"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </ng-container>

      <ng-template #emptyState>
        <div class="empty-state flex-1 flex items-center justify-center text-gray-400">
          Select a conversation to start chatting
        </div>
      </ng-template>
    </section>
  `,
  styles: [
    `
      /* Dark scrollbar for chat messages */
      .chat-messages::-webkit-scrollbar {
        width: 8px;
      }

      .chat-messages::-webkit-scrollbar-track {
        background: #1f2937; /* dark track */
        border-radius: 4px;
      }

      .chat-messages::-webkit-scrollbar-thumb {
        background-color: #4b5563; /* medium gray thumb */
        border-radius: 4px;
        border: 2px solid #1f2937; /* padding around thumb */
      }

      .chat-messages::-webkit-scrollbar-thumb:hover {
        background-color: #6b7280; /* lighter on hover */
      }

      /* Firefox scrollbar support */
      .chat-messages {
        scrollbar-width: thin;
        scrollbar-color: #4b5563 #1f2937; /* thumb | track */
      }
    `,
  ],
})
export class ChatWindowComponent implements OnInit {
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
