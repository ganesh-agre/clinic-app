import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ConversionListComponent } from './components/conversion-list.component';
import { ChatWindowComponent } from './components/chat-window.component';
import { InfoPanelComponent } from './components/info-panel.component';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConversionListComponent,
    ChatWindowComponent,
    InfoPanelComponent,
  ],
  providers: [MessageService],
  template: `
    <div class="messages-layout grid h-[94vh] gap-3 dark:bg-gray-900">
      <!-- LEFT: Conversation List -->
      <aside
        class="sidebar flex flex-col h-full bg-gray-900 border-r border-gray-700 rounded-lg shadow-md"
      >
        <div class="sidebar-header p-4 border-b border-gray-700 flex-shrink-0">
          <h2 class="text-gray-100 text-lg font-semibold">Messages</h2>
          <input
            type="text"
            [formControl]="searchFormControl"
            placeholder="Search"
            class="search-input mt-2 w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div class="flex-1 overflow-y-auto">
          <app-conversation-list [searchText]="searchFormControl.value"></app-conversation-list>
        </div>
      </aside>

      <!-- CENTER: Chat Window -->
      <app-chat-window
        class="h-full rounded-lg shadow-md overflow-hidden bg-gray-800"
      ></app-chat-window>

      <!-- RIGHT: Patient Info -->
      <app-info-panel
        class="h-full rounded-lg shadow-md overflow-y-auto bg-gray-800"
      ></app-info-panel>
    </div>
  `,
  styles: [
    `
      /* MAIN LAYOUT */
      .messages-layout {
        display: grid;
        grid-template-columns: 280px 1fr 320px;
      }

      /* SCROLLBARS */
      .sidebar,
      app-info-panel {
        overflow-y: auto;
      }

      /* Smooth scrolling for chat messages */
      app-chat-window ::ng-deep .chat-messages {
        scroll-behavior: smooth;
      }
    `,
  ],
})
export class MessageComponent {
  searchFormControl = new FormControl('');

  ngOnInit() {}
}
