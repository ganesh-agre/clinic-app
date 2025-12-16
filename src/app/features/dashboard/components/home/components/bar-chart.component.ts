import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { WebLeadData } from '../models/dashboard.model';
import { SpinnerComponent } from '../../../../../shared/components/app-spinner.copmonent';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  template: `
    <div class="chart-parent-container">
      <!-- Spinner overlay -->
      <app-spinner [visible]="loading" size="medium"></app-spinner>

      <!-- Chart container -->
      <div class="chart-container" [style.opacity]="loading ? 0.5 : 1">
        <h3 class="title">{{ title }}</h3>
        <canvas #canvas style="height: calc(100% - 40px); width: 100%;"></canvas>
      </div>
    </div>
  `,
  styles: [
    `
      .chart-parent-container {
        position: relative;
        width: 100%;
        height: 300px;
        border-radius: 8px;
        overflow: hidden;
      }

      .chart-container {
        width: 100%;
        height: 100%;
        background-color: #1f2937;
        padding: 16px;
        box-sizing: border-box;
        padding-bottom: 40px; /* space for legend */
      }

      .title {
        color: white;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class BarChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() data: WebLeadData[] = [];
  @Input() title: string = '';
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  chart: Chart | null = null;
  loading: boolean = true;

  ngAfterViewInit() {
    // simulate async data load
    setTimeout(() => {
      this.loading = false;
      if (this.data && this.data.length) {
        this.renderChart();
      }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['data'].firstChange) {
      this.renderChart();
    }
  }

  ngOnDestroy() {
    if (this.chart) this.chart.destroy();
  }

  private renderChart() {
    if (!this.data || !this.data.length) return;
    const ctx = this.canvas.nativeElement.getContext('2d');
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
          tooltip: { enabled: true },
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
