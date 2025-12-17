// widget-input.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-widget-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-3 border-t flex space-x-2 bg-white">
      <input
        [(ngModel)]="message"
        placeholder="Type your message..."
        class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        (keyup.enter)="sendMessage()"
      />
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        (click)="sendMessage()"
      >
        Send
      </button>
    </div>
  `,
})
export class WidgetInputComponent {
  message = '';
  @Output() send = new EventEmitter<string>();

  sendMessage() {
    if (!this.message.trim()) return;
    this.send.emit(this.message);
    this.message = '';
  }
}
