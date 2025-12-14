import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from '../models/dashboard.model';

@Component({
  selector: 'app-stat-card',
  imports: [CommonModule],
  template: ` <div class="bg-gray-800 text-white p-4 rounded-lg flex items-center space-x-4 shadow">
    <div class="text-3xl">
      <i [class]="card.icon"></i>
    </div>
    <div>
      <p class="text-sm text-gray-300">{{ card.title }}</p>
      <p class="text-xl font-bold">{{ card.value }}</p>
    </div>
  </div>`,
})
export class StatCardComponent {
  @Input() card!: StatCard;
}
