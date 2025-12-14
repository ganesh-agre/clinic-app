import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 pointer-events-auto"
    >
      <div
        [ngClass]="{
          'w-6 h-6 border-4': size === 'small',
          'w-10 h-10 border-8': size === 'medium',
          'w-16 h-16 border-12': size === 'large'
        }"
        class="spinner"
        [style.borderTopColor]="color"
        [style.borderRightColor]="bgColor"
        [style.borderBottomColor]="bgColor"
        [style.borderLeftColor]="bgColor"
      ></div>
    </div>
  `,
  styles: [
    `
      .spinner {
        border-radius: 50%;
        border-style: solid;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class SpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: string = '#22c55e'; // spinning part
  @Input() bgColor: string = '#374151'; // dark background for rest of spinner
  @Input() visible: boolean = true; // toggle spinner visibility
}
