interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}
