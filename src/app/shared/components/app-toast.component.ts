import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
    <div
      *ngIf="message"
      class="fixed top-4 right-4 z-50 px-4 py-2 rounded bg-green-500 text-white dark:bg-green-600 shadow-lg transition-opacity duration-300"
    >
      {{ message }}
    </div>
  `,
})
export class ToastComponent {
  message: string | null = null;

  show(msg: string, duration: number = 3000) {
    this.message = msg;
    setTimeout(() => (this.message = null), duration);
  }
}
