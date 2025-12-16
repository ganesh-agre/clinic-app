// message.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

/* Sample conversations with timestamp & unread */
export const conversations = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  phone: `12345678${i + 10}`,
  lastMessage: `Last message from User ${i + 1}`,
  unread: Math.floor(Math.random() * 5), // random 0-4 unread messages
  messages: Array.from({ length: 50 }, (_, j) => ({
    from: j % 2 === 0 ? 'me' : `them`,
    text: `Message ${j + 1} from ${j % 2 === 0 ? 'me' : 'them'} in conversation ${i + 1}`,
    timestamp: Date.now() - (50 - j) * 60000, // messages spread in the past
  })),
}));

@Injectable({ providedIn: 'root' })
export class MessageService {
  private conversationsSubject = new BehaviorSubject<any[]>(conversations);
  private messagesSubject = new BehaviorSubject<any[]>([]);
  private selectedConversationSubject = new BehaviorSubject<any | null>(null);

  /** Streams */
  getConversations() {
    return this.conversationsSubject.asObservable();
  }

  getMessages() {
    return this.messagesSubject.asObservable();
  }

  getSelectedConversation() {
    return this.selectedConversationSubject.asObservable();
  }

  /** Select conversation */
  selectConversation(conversation: any) {
    // Reset unread when selecting
    conversation.unread = 0;
    this.selectedConversationSubject.next(conversation);
    this.messagesSubject.next([...conversation.messages]);
    this.conversationsSubject.next([...this.conversationsSubject.getValue()]);
  }

  /** Send message */
  sendMessage(text: string) {
    const conv = this.selectedConversationSubject.getValue();
    if (!conv) return;

    const message = { from: 'me', text, timestamp: Date.now() };
    conv.messages.push(message);
    conv.lastMessage = text;

    this.messagesSubject.next([...conv.messages]);
    this.conversationsSubject.next([...this.conversationsSubject.getValue()]);

    // Simulate auto-reply from "them" after 1-2s
    timer(Math.random() * 1000 + 1000).subscribe(() => {
      const reply = {
        from: 'them',
        text: `Auto reply to "${text}"`,
        timestamp: Date.now(),
      };
      conv.messages.push(reply);
      conv.lastMessage = reply.text;

      // If user is not on this conversation, increment unread
      if (this.selectedConversationSubject.getValue()?.id !== conv.id) {
        conv.unread = (conv.unread || 0) + 1;
      }

      this.messagesSubject.next([...conv.messages]);
      this.conversationsSubject.next([...this.conversationsSubject.getValue()]);
    });
  }
}
