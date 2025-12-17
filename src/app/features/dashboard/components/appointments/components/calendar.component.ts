import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';
import { Observable, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-calendar',
  imports: [CommonModule],
  template: `
    <h3 class="font-semibold mb-3 text-gray-900 dark:text-gray-100">Select Date</h3>

    <input
      type="date"
      class="border p-2 rounded w-full
             border-gray-300 dark:border-gray-700
             bg-white dark:bg-gray-800
             text-gray-900 dark:text-gray-100
             transition-colors duration-200
             focus:outline-none focus:ring-2 focus:ring-blue-500
             "
      [min]="today"
      [value]="selectedDate$ | async"
      (change)="onDateChange($event.target.value)"
    />

    <!-- Optional hint for today -->
    <p
      class="mt-1 text-sm text-gray-500 dark:text-gray-400 italic"
      *ngIf="isTodaySelected$ | async"
    >
      Today is selected!
    </p>
  `,
})
export class CalendarComponent {
  today = new Date().toISOString().split('T')[0];
  selectedDate$: Observable<string | null>;
  isTodaySelected$: Observable<boolean>;

  constructor(private appointmentService: AppointmentService) {
    this.selectedDate$ = this.appointmentService.date$;
    this.isTodaySelected$ = this.selectedDate$.pipe(map((date) => date === this.today));
  }

  onDateChange(date: string) {
    this.appointmentService.selectDate(date);
  }
}
