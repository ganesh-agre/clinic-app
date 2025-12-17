import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderListComponent } from './components/provider-list.component';
import { CalendarComponent } from './components/calendar.component';
import { TimeSlotListComponent } from './components/time-slot-list.component';
import { AppointmentSummaryComponent } from './components/appointment-summary.component';
import { ConfirmAppointmentComponent } from './components/confirm-appointment.component';

@Component({
  standalone: true,
  selector: 'app-appointments-page',
  imports: [
    CommonModule,
    ProviderListComponent,
    CalendarComponent,
    TimeSlotListComponent,
    AppointmentSummaryComponent,
    ConfirmAppointmentComponent,
  ],
  template: `
    <div class=" space-y-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Book Appointment</h2>

      <div class="grid grid-cols-12 gap-6">
        <!-- Provider List -->
        <div class="col-span-3 border rounded p-4 border-gray-300 dark:border-gray-700">
          <app-provider-list />
        </div>

        <!-- Calendar -->
        <div class="col-span-4 border rounded p-4 border-gray-300 dark:border-gray-700">
          <app-calendar />
        </div>

        <!-- Time Slots -->
        <div class="col-span-5 border rounded p-4 border-gray-300 dark:border-gray-700">
          <app-time-slot-list />
        </div>

        <!-- Summary -->
        <div class="col-span-12 border rounded p-4 border-gray-300 dark:border-gray-700">
          <app-appointment-summary />
        </div>

        <!-- Confirm Button -->
        <div class="col-span-12 flex justify-end">
          <app-confirm-appointment />
        </div>
      </div>
    </div>
  `,
})
export class AppointmentPageComponent {}
