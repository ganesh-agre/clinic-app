import { Component } from '@angular/core';
import { AppDashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-dashboard',
  imports: [AppDashboardLayoutComponent],
  template: '<app-dashboard-layout></app-dashboard-layout>',
})
export class DashboardComponent {}
