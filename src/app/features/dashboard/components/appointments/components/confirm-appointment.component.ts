import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';
import { Observable, map } from 'rxjs';
import { ToastComponent } from '../../../../../shared/components/app-toast.component';

@Component({
  standalone: true,
  selector: 'app-confirm-appointment',
  imports: [CommonModule, ToastComponent],
  template: `
    <div class="mt-4">
      <button
        class="px-4 py-2 rounded text-white
               bg-green-600 hover:bg-green-700
               dark:bg-green-700 dark:hover:bg-green-800
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-colors duration-150"
        [disabled]="!(isReady$ | async)"
        (click)="confirmAppointment()"
      >
        Confirm Appointment
      </button>

      <!-- Toast is global, we only reference it here -->
      <app-toast #toast></app-toast>
    </div>
  `,
})
export class ConfirmAppointmentComponent {
  @ViewChild('toast') toast!: ToastComponent;
  isReady$: Observable<boolean | null>;
  constructor(private appointmentService: AppointmentService) {
    // Button is enabled only if provider, date, and slot are selected
    this.isReady$ = this.appointmentService.summary$.pipe(
      map((summary) => !!summary?.provider && !!summary.date && !!summary.slot)
    );
  }

  confirmAppointment() {
    this.appointmentService.summary$
      .subscribe((summary: any) => {
        if (summary.provider && summary.date && summary.slot) {
          this.toast.show(
            `Appointment confirmed with ${summary.provider.name} on ${summary.date} at ${summary.slot}`
          );
        }
      })
      .unsubscribe(); // unsubscribe immediately to avoid memory leaks
  }
}
