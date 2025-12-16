import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" class="spinner-overlay">
      <div class="spinner" [ngStyle]="spinnerStyle"></div>
    </div>
  `,
  styles: [
    `
      .spinner-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* dark semi-transparent overlay */
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        pointer-events: all; /* block interaction with parent */
      }

      .spinner {
        border-radius: 50%;
        border-style: solid;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class SpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: string = '#22c55e'; // spinning part
  @Input() bgColor: string = '#ccc'; // other parts of border
  @Input() visible: boolean = true;

  get spinnerStyle() {
    let sizePx: string;
    let borderWidth: string;

    switch (this.size) {
      case 'small':
        sizePx = '24px';
        borderWidth = '4px';
        break;
      case 'medium':
        sizePx = '40px';
        borderWidth = '6px';
        break;
      case 'large':
        sizePx = '64px';
        borderWidth = '8px';
        break;
    }

    return {
      width: sizePx,
      height: sizePx,
      borderWidth: borderWidth,
      borderTopColor: this.color,
      borderRightColor: this.bgColor,
      borderBottomColor: this.bgColor,
      borderLeftColor: this.bgColor,
    };
  }
}
