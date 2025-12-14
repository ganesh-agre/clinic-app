import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { WebLeadData } from '../models/dashboard.model';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
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
export class BarChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data: WebLeadData[] = [];
  @Input() title: string = '';

  chartId = 'bar-' + Math.random().toString(36).substring(2, 15);
  private chart: Chart | null = null;

  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      this.renderChart();
    }
  }

  ngOnDestroy() {
    if (this.chart) this.chart.destroy();
  }

  private renderChart() {
    if (!this.data || !this.data.length) return;

    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: this.data.map((d) => d.date),
        datasets: [
          {
            label: this.title,
            data: this.data.map((d) => d.leads),
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            ticks: { color: 'white' },
            grid: { display: false },
          },
          y: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.1)' },
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }
}
