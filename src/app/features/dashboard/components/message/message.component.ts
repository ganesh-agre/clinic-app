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
    <div class="messages-layout">
      <!-- LEFT: Conversation List -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>Messages</h2>
          <input
            type="text"
            [formControl]="searchFormControl"
            placeholder="Search"
            class="search-input"
          />
        </div>

        <app-conversation-list [searchText]="this.searchFormControl.value"> </app-conversation-list>
      </aside>

      <!-- CENTER: Chat Window -->
      <app-chat-window></app-chat-window>

      <!-- RIGHT: Patient Info -->
      <app-info-panel></app-info-panel>
    </div>
  `,
  styles: [
    `
      /* MAIN LAYOUT */
      .messages-layout {
        display: grid;
        grid-template-columns: 300px 1fr 300px;
        height: 100%;
        background: #f3f4f6;
      }

      /* SIDEBAR */
      .sidebar {
        background: #ffffff;
        border-right: 1px solid #e5e7eb;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .sidebar-header {
        padding: 12px;
        border-bottom: 1px solid #e5e7eb;
      }

      .search-input {
        width: 100%;
        padding: 6px 8px;
        margin-top: 8px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
      }
    `,
  ],
})
export class MessageComponent {
  searchFormControl = new FormControl('');

  ngOnInit() {}
}
