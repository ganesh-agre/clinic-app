import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardHomeService } from './services/dashboard-home.service';
import { StatCardComponent } from './components/stat-card.component';
import { DonutChartComponent } from './components/donut-chart.component';

import { BarChartComponent } from './components/bar-chart.component';
import { MessageStatCardComponent } from './components/message-stat-card.component';
import { ActivityFeedComponent } from './components/activity-feed.component';
import { SpinnerComponent } from '../../../../shared/components/app-spinner.copmonent';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    DonutChartComponent,
    BarChartComponent,
    MessageStatCardComponent,
    ActivityFeedComponent,
    SpinnerComponent,
  ],
  template: `
    <div class="p-4 space-y-4 relative">
      <!-- Spinner overlay only over dashboard content 
      <app-spinner [visible]="loading" size="large"></app-spinner>-->
      <!-- Stat Cards Row -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <app-stat-card *ngFor="let card of statCards$ | async" [card]="card"></app-stat-card>
      </div>
      <!--Charts Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <app-donut-chart
          *ngIf="leadData$ | async as data"
          [data]="data"
          title="Leads Distribution"
        ></app-donut-chart>

        <app-bar-chart
          *ngIf="webLeadsData$ | async as data"
          [data]="data"
          title="Web Leads"
        ></app-bar-chart>
        <app-message-stat-card [stats]="(messageStats$ | async) || null"></app-message-stat-card>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-1 gap-4 ">
        <app-activity-feed [activities]="(activityFeed$ | async) || []"></app-activity-feed>
      </div>
    </div>
  `,
})
export class DashboardHomeComponent {
  private dahboardHomeService: DashboardHomeService = inject(DashboardHomeService);
  statCards$ = this.dahboardHomeService.getStatCards();
  leadData$ = this.dahboardHomeService.getLeadData();
  webLeadsData$ = this.dahboardHomeService.getWebLeadsData();
  activityFeed$ = this.dahboardHomeService.getActivityFeed();
  messageStats$ = this.dahboardHomeService.getMessageStats();
  appointmentSummary$ = this.dahboardHomeService.getAppointmentSummary();
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
  }

  ngAfterViewInit(): void {
    // Simulate data loading delay
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
