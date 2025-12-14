import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  StatCard,
  LeadData,
  ActivityItem,
  MessageStat,
  AppointmentSummary,
  WebLeadData,
} from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeService {
  constructor(private http: HttpClient) {}

  // ----------------------
  // Dashboard Stat Cards
  // ----------------------
  getStatCards(): Observable<StatCard[]> {
    return of([
      { title: 'Calls Today', value: 25, icon: 'fas fa-phone', colorClass: 'bg-blue-600' },
      { title: 'Call Leads', value: 45, icon: 'fas fa-list', colorClass: 'bg-teal-600' },
      {
        title: 'Appointments',
        value: 10,
        icon: 'fas fa-calendar-check',
        colorClass: 'bg-yellow-500',
      },
      { title: 'Messages', value: 8, icon: 'fas fa-comment', colorClass: 'bg-indigo-600' },
    ]);
  }

  // ----------------------
  // Lead Data (for pie chart)
  // ----------------------
  getLeadData(): Observable<LeadData[]> {
    return of([
      { category: 'Warm', value: 20, color: '#fbbf24' },
      { category: 'Processing', value: 15, color: '#3b82f6' },
      { category: 'Converted', value: 10, color: '#10b981' },
    ]);
  }

  // ----------------------
  // Web Leads data (bar chart example)
  // ----------------------
  getWebLeadsData(): Observable<WebLeadData[]> {
    return of([
      { date: '2025-12-10', leads: 5 },
      { date: '2025-12-11', leads: 7 },
      { date: '2025-12-12', leads: 4 },
      { date: '2025-12-13', leads: 9 },
    ]);
  }

  // ----------------------
  // Activity Feed
  // ----------------------
  getActivityFeed(): Observable<ActivityItem[]> {
    return of([
      { id: 1, description: 'Patient John Doe booked an appointment.', timestamp: new Date() },
      { id: 2, description: 'Message received from Jane Smith.', timestamp: new Date() },
      { id: 3, description: 'Appointment with Dr. Adams completed.', timestamp: new Date() },
      { id: 4, description: 'New patient Mike Johnson registered.', timestamp: new Date() },
    ]);
  }

  // ----------------------
  // Message Stats
  // ----------------------
  getMessageStats(): Observable<MessageStat> {
    return of({
      unreadCount: 12,
      totalMessages: 340,
    });
  }

  // ----------------------
  // Appointment Summary
  // ----------------------
  getAppointmentSummary(): Observable<AppointmentSummary> {
    return of({
      total: 20,
      upcoming: 8,
      completed: 12,
    });
  }
}
