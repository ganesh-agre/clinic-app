import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  /** Send a message from the user */
  sendUserMessage(content: string) {
    if (!content.trim()) return;

    const msg: Message = {
      id: this.generateId(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    this.addMessage(msg);
    this.simulateBotReply(content);
  }

  /** Handle quick reply button click */
  sendQuickReply(reply: string) {
    const msg: Message = {
      id: this.generateId(),
      type: 'user',
      content: reply,
      timestamp: new Date(),
    };

    this.addMessage(msg);
    this.simulateBotReply(reply);
  }

  /** Simulate bot response after delay */
  private simulateBotReply(userContent: string) {
    timer(1000) // simulate typing delay
      .pipe(
        concatMap(() => {
          const botMsg: Message = {
            id: this.generateId(),
            type: 'bot',
            content: `Bot reply to: ${userContent}`,
            timestamp: new Date(),
            quickReplies: ['Option 1', 'Option 2'],
          };
          return [botMsg];
        })
      )
      .subscribe((msg) => this.addMessage(msg));
  }

  /** Add message to BehaviorSubject + localStorage */
  private addMessage(msg: Message) {
    const updated = [...this.messagesSubject.value, msg];
    this.messagesSubject.next(updated);
    localStorage.setItem('widgetMessages', JSON.stringify(updated));
  }

  /** Load messages from localStorage */
  private loadFromLocalStorage() {
    const stored = localStorage.getItem('widgetMessages');
    if (stored) {
      this.messagesSubject.next(JSON.parse(stored));
    }
  }

  /** Simple ID generator */
  private generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
