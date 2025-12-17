import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';
import { Provider } from '../models/appointment.models';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-provider-list',
  imports: [CommonModule],
  template: `
    <h3 class="font-semibold mb-3 text-gray-900 dark:text-gray-100">Providers</h3>

    <div
      *ngFor="let provider of providers$ | async"
      (click)="selectProvider(provider)"
      class="p-3 mb-2 border rounded cursor-pointer
             border-gray-300 dark:border-gray-700
             text-gray-900 dark:text-gray-100
             hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-150"
      [class.bg-blue-100]="(selectedProvider$ | async)?.id === provider.id"
      [class.dark:bg-blue-800]="(selectedProvider$ | async)?.id === provider.id"
    >
      <div class="font-medium">{{ provider.name }}</div>
      <div class="text-sm text-gray-500 dark:text-gray-300">
        {{ provider.specialty }}
      </div>
    </div>
  `,
})
export class ProviderListComponent {
  providers$!: Observable<Provider[]>;
  selectedProvider$: Observable<Provider | null>;

  constructor(private appointmentService: AppointmentService) {
    this.selectedProvider$ = this.appointmentService.provider$;
  }

  ngOnInit() {
    this.providers$ = this.appointmentService.getProviders();
  }

  selectProvider(provider: Provider) {
    this.appointmentService.selectProvider(provider);
  }
}
