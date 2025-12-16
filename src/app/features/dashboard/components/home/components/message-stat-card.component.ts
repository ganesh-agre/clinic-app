import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageStat } from '../models/dashboard.model';
import { SpinnerComponent } from '../../../../../shared/components/app-spinner.copmonent';

@Component({
  selector: 'app-message-stat-card',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  template: `
    <div class="card-container">
      <!-- Spinner overlay -->
      <app-spinner [visible]="loading" size="medium"></app-spinner>

      <!-- Card content -->
      <div class="card-content" [style.opacity]="loading ? 0.5 : 1">
        <h3 class="title">Messages</h3>

        <div class="stats">
          <!-- Total -->
          <div class="stat-row">
            <span class="label">Total</span>
            <span class="value">{{ stats?.totalMessages }}</span>
          </div>

          <!-- Unread -->
          <div class="stat-row">
            <span class="label">Unread</span>
            <span class="value unread">{{ stats?.unreadCount }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card-container {
        position: relative;
        background-color: #1f2937;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        height: 300px; /* same as h-64 */
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        background-color: #1f2937;
      }

      .title {
        color: white;
        font-size: 1.125rem;
        margin-bottom: 16px;
      }

      .stats {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 16px;
      }

      .stat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .label {
        color: #9ca3af; /* gray-400 */
      }

      .value {
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .unread {
        color: #f87171; /* red-400 */
      }
    `,
  ],
})
export class MessageStatCardComponent {
  @Input() stats: MessageStat | null = null;
  loading: boolean = true;

  // Simulate async loading
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000); // adjust delay or bind to actual data
  }
}
