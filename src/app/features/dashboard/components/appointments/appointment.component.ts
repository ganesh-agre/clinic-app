import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment',
  template: `<h1 class="text-2xl font-bold">Appointments Component</h1>`,
  standalone: true,
})
export class AppointmentComponent {
  appointments: any[] = [];

  constructor() {}
}
