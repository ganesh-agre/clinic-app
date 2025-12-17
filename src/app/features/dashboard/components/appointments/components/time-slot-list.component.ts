import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Observable } from 'rxjs';
import { TimeSlot } from '../models/appointment.models';

@Component({
  standalone: true,
  selector: 'app-time-slot-list',
  imports: [CommonModule],
  template: `
    <h3 class="font-semibold mb-3">Available Slots</h3>

    <ng-container *ngIf="ready$ | async; else notReady">
      <div class="grid grid-cols-3 gap-2">
        <button
          *ngFor="let s of slots$ | async"
          (click)="select(s)"
          [disabled]="!s.available"
          class="p-2 rounded border"
          [class.bg-blue-600]="s.available"
          [class.text-white]="s.available"
        >
          {{ s.time }}
        </button>
      </div>
    </ng-container>

    <ng-template #notReady>
      <p class="text-sm text-gray-500 italic">Select provider and date to see available slots</p>
    </ng-template>
  `,
})
export class TimeSlotListComponent {
  slots$!: Observable<TimeSlot[]>;
  ready$!: Observable<boolean>;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.slots$ = this.appointmentService.availableSlots$;
    this.ready$ = this.appointmentService.isSlotSelectionReady$;
  }

  select(slot: TimeSlot) {
    if (slot.available) {
      this.appointmentService.selectSlot(slot.time);
    }
  }
}
