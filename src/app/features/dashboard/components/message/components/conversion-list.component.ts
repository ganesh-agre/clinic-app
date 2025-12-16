import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="conversation-list">
      <div
        class="conversation-item"
        *ngFor="let c of conversations$ | async"
        [class.active]="c.id === (selectedConversation$ | async)?.id"
        (click)="select(c)"
      >
        <div class="avatar">{{ c.name[0] }}</div>
        <div class="conversation-info">
          <div class="name">
            {{ c.name }} <span *ngIf="c.unread > 0" class="badge">{{ c.unread }}</span>
          </div>
          <div class="last-message">{{ c.lastMessage }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .conversation-list {
        overflow-y: auto;
        height: 480px;
      }

      .conversation-item {
        display: flex;
        padding: 10px;
        cursor: pointer;
        border-bottom: 1px solid #f1f5f9;
      }

      .conversation-item:hover {
        background: #f9fafb;
      }

      .conversation-item.active {
        background: #e5f0ff;
      }

      .badge {
        background: #ef4444;
        color: white;
        border-radius: 12px;
        padding: 2px 6px;
        font-size: 12px;
        margin-left: 8px;
      }

      .avatar {
        width: 36px;
        height: 36px;
        background: #3b82f6;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 10px;
      }
    `,
  ],
})
export class ConversionListComponent {
  serachTeaxtSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  @Input()
  set searchText(value: string | null) {
    this.serachTeaxtSubject.next(value);
  }

  conversations$!: Observable<any[]>;
  selectedConversation$!: Observable<any | null>;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    const allConversations$ = this.messageService.getConversations();
    const searchText$ = this.serachTeaxtSubject.asObservable();

    this.conversations$ = combineLatest([allConversations$, searchText$]).pipe(
      map(([conversations, searchText]) => {
        if (!searchText) return conversations;
        return conversations.filter((conv) =>
          conv.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }),
      tap((convs) => console.log('Filtered conversations:', convs))
    );

    this.selectedConversation$ = this.messageService.getSelectedConversation();
  }

  select(conv: any) {
    this.messageService.selectConversation(conv);
  }
}
