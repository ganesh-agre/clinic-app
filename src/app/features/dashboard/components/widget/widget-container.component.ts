// widget-container.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetService } from './services/widget.service';
import { WidgetMessagesComponent } from './components/widget-messsages.component';
import { WidgetInputComponent } from './components/widget-input.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-widget-container',
  standalone: true,
  imports: [CommonModule, WidgetMessagesComponent, WidgetInputComponent],
  template: `
    <!-- Floating Chat Button -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        *ngIf="!isOpen"
        class="bg-blue-600 text-white p-4 rounded-full shadow-lg animate-bounce flex items-center justify-center hover:bg-blue-700 transition"
        (click)="toggleWidget()"
        title="Chat with us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.955 9.955 0 01-5.528-1.568L3 21l1.568-3.472A9.955 9.955 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      <!-- Widget Panel -->
      <div
        *ngIf="isOpen"
        class="mt-2 w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-200"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between bg-blue-600 text-white px-4 py-2 flex-shrink-0"
        >
          <span class="font-semibold">Support Chat</span>
          <button (click)="toggleWidget()" class="hover:text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Messages + input wrapper -->
        <div class="flex-1 flex flex-col min-h-0">
          <!-- Messages: ONLY height -->
          <app-widget-messages
            [messages]="messages$ | async"
            (quickReply)="sendQuickReply($event)"
            class="flex-1 min-h-0"
          ></app-widget-messages>

          <!-- Input -->
          <app-widget-input class="flex-shrink-0" (send)="sendMessage($event)"></app-widget-input>
        </div>
      </div>
    </div>
  `,
})
export class WidgetContainerComponent {
  messages$!: Observable<Message[]>;
  isOpen = false;

  constructor(private widgetService: WidgetService) {}

  ngOnInit() {
    this.messages$ = this.widgetService.messages$;
  }

  toggleWidget() {
    this.isOpen = !this.isOpen;
  }

  sendMessage(msg: string) {
    this.widgetService.sendUserMessage(msg);
  }

  sendQuickReply(reply: string) {
    this.widgetService.sendQuickReply(reply);
  }
}
