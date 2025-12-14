import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityItem } from '../models/dashboard.model';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activity-feed bg-gray-800 p-4 rounded-lg shadow w-full">
      <h3 class="text-white text-lg mb-4">Activity Feed</h3>

      <div class="activity-feed__list pr-2 space-y-4">
        <div *ngFor="let item of activities; trackBy: trackById" class="flex items-start space-x-3">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            [ngClass]="iconBg(item.description)"
          >
            <i class="text-white text-sm" [ngClass]="icon(item.description)"></i>
          </div>

          <div class="flex-1">
            <p class="text-gray-200 text-sm">{{ item.description }}</p>
            <p class="text-gray-500 text-xs mt-1">
              {{ item.timestamp | date : 'short' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .activity-feed {
        height: 10rem;
        display: flex;
        flex-direction: column;
      }

      .activity-feed__list {
        flex: 1;
        overflow-y: auto;
      }

      /* Optional: custom scrollbar */
      .activity-feed__list::-webkit-scrollbar {
        width: 6px;
      }
      .activity-feed__list::-webkit-scrollbar-thumb {
        background-color: #4b5563; /* gray-600 */
        border-radius: 4px;
      }
      .activity-feed__list::-webkit-scrollbar-track {
        background-color: transparent;
      }
    `,
  ],
})
export class ActivityFeedComponent {
  @Input() activities: ActivityItem[] = [];

  trackById(index: number, item: ActivityItem): number {
    return item.id;
  }

  icon(description: string): string {
    const text = description.toLowerCase();
    if (text.includes('message')) return 'fas fa-comment';
    if (text.includes('appointment')) return 'fas fa-calendar-check';
    if (text.includes('call')) return 'fas fa-phone';
    if (text.includes('registered')) return 'fas fa-user-plus';
    return 'fas fa-info-circle';
  }

  iconBg(description: string): string {
    const text = description.toLowerCase();
    if (text.includes('message')) return 'bg-blue-600';
    if (text.includes('appointment')) return 'bg-green-600';
    if (text.includes('call')) return 'bg-purple-600';
    if (text.includes('registered')) return 'bg-teal-600';
    return 'bg-gray-600';
  }
}
