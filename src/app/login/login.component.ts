import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <!-- Container for the form and registration link stacked vertically -->
      <div class="flex flex-col items-center justify-center space-y-6">
        <!-- Login Form -->
        <form
          #loginForm="ngForm"
          (ngSubmit)="onSubmit(loginForm)"
          class="max-w-md w-full p-6 border rounded-lg shadow-lg bg-white"
        >
          <!-- Username Field -->
          <input
            [(ngModel)]="model.username"
            name="username"
            required
            placeholder="Username"
            class="w-full mb-4 p-2 border rounded"
            #username="ngModel"
          />
          <div *ngIf="username.invalid && username.touched" class="text-red-500 text-sm">
            Username is required.
          </div>

          <!-- Password Field -->
          <input
            [(ngModel)]="model.password"
            name="password"
            type="password"
            required
            placeholder="Password"
            class="w-full mb-4 p-2 border rounded"
            #password="ngModel"
          />
          <div *ngIf="password.invalid && password.touched" class="text-red-500 text-sm">
            Password is required.
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="loginForm.invalid"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            Login
          </button>
        </form>

        <!-- Registration Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account? <a href="/register" class="text-blue-500">Register</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class LoginComponent {
  loginForm: NgForm | undefined;
  model = { username: 'User1', password: 'Welcome1' };

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!', this.model);
      this.authService
        .login(this.model.username, this.model.password)
        .subscribe((authtoken: string) => {
          if (authtoken) {
            console.log('Login successful : ' + authtoken);
          }
        });
    } else {
      console.log('Form is invalid');
      console.log(form);
    }
  }
}
