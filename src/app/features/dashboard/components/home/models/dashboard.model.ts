export interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  colorClass?: string; // Tailwind bg color class string
}

export interface LeadData {
  category: string;
  value: number;
  color: string; // hex or rgb string
}

export interface WebLeadData {
  date: string; // e.g., '2025-12-10'
  leads: number;
}

export interface ActivityItem {
  id: number;
  description: string;
  timestamp: Date;
}

export interface MessageStat {
  unreadCount: number;
  totalMessages: number;
}

export interface AppointmentSummary {
  total: number;
  upcoming: number;
  completed: number;
}
