import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { BehaviorSubject, combineLatest, map, Observable, take, tap } from 'rxjs';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="conversation-list h-[450px] overflow-y-auto h-96 bg-gray-900 rounded-lg shadow-md p-2"
    >
      <div
        class="conversation-item flex items-center p-3 cursor-pointer rounded-md mb-1 transition-colors"
        *ngFor="let c of conversations$ | async"
        [ngClass]="{
          'bg-gray-800': c.id === (selectedConversation$ | async)?.id,
          'hover:bg-gray-700': c.id !== (selectedConversation$ | async)?.id
        }"
        (click)="select(c)"
      >
        <div
          class="avatar w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-3"
        >
          {{ c.name[0] }}
        </div>
        <div class="conversation-info flex-1">
          <div class="name flex items-center justify-between font-medium text-gray-100">
            {{ c.name }}
            <span
              *ngIf="c.unread > 0"
              class="badge bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2"
            >
              {{ c.unread }}
            </span>
          </div>
          <div class="last-message text-gray-400 text-sm mt-1 truncate">
            {{ c.lastMessage }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Dark scrollbar for conversation list */
      .conversation-list::-webkit-scrollbar {
        width: 8px;
      }

      .conversation-list::-webkit-scrollbar-track {
        background: #1f2937; /* dark track */
        border-radius: 4px;
      }

      .conversation-list::-webkit-scrollbar-thumb {
        background-color: #4b5563; /* medium gray thumb */
        border-radius: 4px;
        border: 2px solid #1f2937; /* adds padding around thumb */
      }

      .conversation-list::-webkit-scrollbar-thumb:hover {
        background-color: #6b7280; /* lighter on hover */
      }

      /* Firefox support */
      .conversation-list {
        scrollbar-width: thin;
        scrollbar-color: #4b5563 #1f2937; /* thumb | track */
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
      })
    );

    this.selectedConversation$ = this.messageService.getSelectedConversation();

    allConversations$.pipe(take(1)).subscribe((convs) => {
      if (convs.length > 0) {
        this.messageService.selectConversation(convs[0]);
      }
    });
  }

  select(conv: any) {
    this.messageService.selectConversation(conv);
  }
}
