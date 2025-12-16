import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-info-panel',
  imports: [CommonModule, FormsModule],
  template: ` <!-- RIGHT: Patient Info -->
    <aside class="info">
      <ng-container *ngIf="selectedConversation$ | async as selectedConversation">
        <h3>Patient Info</h3>
        <p><strong>Name:</strong> {{ selectedConversation.name }}</p>
        <p><strong>Phone:</strong> {{ selectedConversation.phone }}</p>
      </ng-container>
    </aside>`,
  styles: [
    `
      /* INFO PANEL */
      .info {
        background: #ffffff;
        border-left: 1px solid #e5e7eb;
        padding: 12px;
      }
    `,
  ],
})
export class InfoPanelComponent {
  selectedConversation$!: Observable<any | null>;
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.selectedConversation$ = this.messageService.getSelectedConversation();
  }
}
