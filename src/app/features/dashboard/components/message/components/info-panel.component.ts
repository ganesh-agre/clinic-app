import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-info-panel',
  imports: [CommonModule, FormsModule],
  template: `
    <!-- RIGHT: Patient Info -->
    <aside
      class="info flex flex-col h-[570px] p-4 bg-gray-900 border-l border-gray-700 rounded-lg shadow-md text-gray-100"
    >
      <ng-container *ngIf="selectedConversation$ | async as selectedConversation; else emptyState">
        <div class="flex items-center mb-4">
          <!-- Avatar -->
          <div
            class="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white mr-4"
          >
            {{ selectedConversation.name[0] }}
          </div>
          <!-- Name & phone -->
          <div class="flex flex-col">
            <span class="text-lg font-semibold">{{ selectedConversation.name }}</span>
            <span class="text-sm text-gray-400">{{ selectedConversation.phone }}</span>
          </div>
        </div>

        <!-- Hardcoded info fields -->
        <div class="space-y-2">
          <p><strong>Email:</strong> demo@example.com</p>
          <p><strong>Age:</strong> 29</p>
          <p><strong>Address:</strong> 123 Demo Street</p>
          <p><strong>Last Visit:</strong> 2025-12-01</p>
        </div>
      </ng-container>

      <ng-template #emptyState>
        <div class="flex-1 flex items-center justify-center text-gray-400">
          Select a conversation to see patient info
        </div>
      </ng-template>
    </aside>
  `,
})
export class InfoPanelComponent implements OnInit {
  selectedConversation$!: Observable<any | null>;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.selectedConversation$ = this.messageService.getSelectedConversation();
  }
}
