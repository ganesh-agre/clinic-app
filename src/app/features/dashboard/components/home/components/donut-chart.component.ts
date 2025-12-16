import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadData } from '../models/dashboard.model';
import { Chart } from 'chart.js/auto';
import { SpinnerComponent } from '../../../../../shared/components/app-spinner.copmonent';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  template: `
    <div class="chart-parent-contaner">
      <!-- Spinner overlay -->
      <app-spinner [visible]="loading" size="medium"></app-spinner>

      <!-- Chart container -->
      <div class="chart-contaner" [style.opacity]="loading ? 0.5 : 1">
        <h3 class="title">{{ title }}</h3>
        <canvas #canvas style="height: calc(100% - 40px); width: 100%;"></canvas>
      </div>
    </div>
  `,
  styles: [
    `
      .chart-parent-contaner {
        position: relative;
        width: 100%;
        height: 300px;
        border-radius: 8px;
        overflow: hidden;
      }

      .chart-contaner {
        width: 100%;
        height: 100%;
        background-color: #1f2937;
        padding: 16px;
        box-sizing: border-box;
        padding-bottom: 40px;
      }

      .title {
        color: white;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class DonutChartComponent implements AfterViewInit {
  @Input() data: LeadData[] = [];
  @Input() title: string = '';
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  loading: boolean = true;

  ngAfterViewInit(): void {
    // Simulate async data fetch
    setTimeout(() => {
      this.loading = false;
      if (this.data && this.data.length) {
        this.renderChart();
      }
    }, 1000); // adjust delay as needed
  }

  private renderChart() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.data.map((d) => d.category),
        datasets: [
          {
            data: this.data.map((d) => d.value),
            backgroundColor: this.data.map((d) => d.color),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'white' },
          },
        },
      },
    });
  }
}
