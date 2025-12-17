import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';
import { Observable, combineLatest } from 'rxjs';
import { Provider } from '../models/appointment.models';

@Component({
  standalone: true,
  selector: 'app-appointment-summary',
  imports: [CommonModule],
  template: `
    <h3 class="font-semibold mb-3 text-gray-900 dark:text-gray-100">Appointment Summary</h3>

    <div
      class="p-4 border rounded border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      *ngIf="summary$ | async as summary; else empty"
    >
      <p>
        <span class="font-medium">Provider:</span> {{ summary.provider?.name || 'Not selected' }}
      </p>
      <p><span class="font-medium">Specialty:</span> {{ summary.provider?.specialty || '-' }}</p>
      <p><span class="font-medium">Date:</span> {{ summary.date || 'Not selected' }}</p>
      <p><span class="font-medium">Time Slot:</span> {{ summary.slot || 'Not selected' }}</p>
    </div>

    <ng-template #empty>
      <p class="text-sm text-gray-500 dark:text-gray-400 italic">
        Select provider, date, and slot to see summary.
      </p>
    </ng-template>
  `,
})
export class AppointmentSummaryComponent {
  summary$: Observable<{
    provider: Provider | null;
    date: string | null;
    slot: string | null;
  } | null>;

  constructor(private appointmentService: AppointmentService) {
    this.summary$ = this.appointmentService.summary$;
  }
}
