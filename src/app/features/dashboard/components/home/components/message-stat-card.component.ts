import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageStat } from '../models/dashboard.model';

@Component({
  selector: 'app-message-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-800 p-4 rounded-lg shadow h-64 w-full flex flex-col">
      <h3 class="text-white text-lg mb-4">Messages</h3>

      <div class="flex-1 flex flex-col justify-center space-y-4">
        <!-- Total -->
        <div class="flex items-center justify-between">
          <span class="text-gray-400">Total</span>
          <span class="text-white text-2xl font-semibold">
            {{ stats?.totalMessages }}
          </span>
        </div>

        <!-- Unread -->
        <div class="flex items-center justify-between">
          <span class="text-gray-400">Unread</span>
          <span class="text-red-400 text-2xl font-semibold">
            {{ stats?.unreadCount }}
          </span>
        </div>
      </div>
    </div>
  `,
})
export class MessageStatCardComponent {
  @Input() stats: MessageStat | null = null;
}
