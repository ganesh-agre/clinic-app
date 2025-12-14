import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadData } from '../models/dashboard.model';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-donut-chart',
  imports: [CommonModule],
  template: `
    <div class="bg-gray-800 p-4 rounded-lg shadow h-64 w-full flex flex-col">
      <h3 class="text-white text-lg mb-2">{{ title }}</h3>
      <div class="flex-1 min-h-0">
        <canvas [id]="chartId"></canvas>
      </div>
    </div>
  `,
})
export class DonutChartComponent {
  @Input() data: LeadData[] = [];
  @Input() title: string = '';
  chartId = 'donut' + Math.random().toString(36).substring(2, 15);

  ngAfterViewInit() {
    if (!this.data.length) return;
    this.renderChart();
  }

  renderChart() {
    const ctx = (document.getElementById(this.chartId) as HTMLCanvasElement).getContext('2d');
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
        maintainAspectRatio: false, // ← THIS is key
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'white',
            },
          },
        },
      },
    });
  }
}
