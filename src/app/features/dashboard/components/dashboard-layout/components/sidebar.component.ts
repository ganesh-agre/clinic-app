import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Sidebar - Always open, fixed on the left with a very narrow width -->
    <div class="fixed inset-0 w-20 bg-gray-800 text-white z-50">
      <div class="flex flex-col items-center p-3 space-y-6">
        <!-- Sidebar Links (Icons with Tooltip) -->

        <div class="relative group">
          <a [routerLink]="['home']" class="hover:bg-gray-700 p-2 rounded-md w-full text-center">
            <i class="fas fa-tachometer-alt text-white text-xl"></i>
            <!-- Dashboard Icon -->
          </a>
          <!-- Tooltip for Dashboard -->
          <span
            class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300"
          >
            Dashboard
          </span>
        </div>

        <div class="relative group">
          <a
            [routerLink]="['messages']"
            class="hover:bg-gray-700 p-2 rounded-md w-full text-center"
          >
            <i class="fas fa-comment-dots text-white text-xl"></i>
            <!-- Messages Icon -->
          </a>
          <!-- Tooltip for Messages -->
          <span
            class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300"
          >
            Messages
          </span>
        </div>

        <div class="relative group">
          <a
            [routerLink]="['appointments']"
            class="hover:bg-gray-700 p-2 rounded-md w-full text-center"
          >
            <i class="fas fa-calendar-check text-white text-xl"></i>
            <!-- Appointment Icon -->
          </a>
          <!-- Tooltip for Appointment -->
          <span
            class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300"
          >
            Appointment
          </span>
        </div>

        <!--<div class="relative group">
          <a [routerLink]="['widget']" class="hover:bg-gray-700 p-2 rounded-md w-full text-center">
            <i class="fas fa-cogs text-white text-xl"></i>
            <-- Widget Icon --
          </a>
          <-- Tooltip for Widget --
          <span
            class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300"
          >
            Widget
          </span>
        </div>-->

        <div class="relative group">
          <a [routerLink]="['profile']" class="hover:bg-gray-700 p-2 rounded-md w-full text-center">
            <i class="fas fa-user text-white text-xl"></i>
            <!-- Profile Icon -->
          </a>
          <!-- Tooltip for Profile -->
          <span
            class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300"
          >
            Profile
          </span>
        </div>

        <div class="relative group">
          <a
            (click)="logout($event)"
            href="#"
            class="hover:bg-gray-700 p-2 rounded-md w-full text-center"
          >
            <i class="fas fa-sign-out-alt text-white text-xl"></i>
            <!-- Logout Icon -->
          </a>
          <!-- Tooltip for Logout -->
          <span
            class="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300"
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  `,
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}
  logout(event: UIEvent) {
    event.preventDefault();
    this.authService.logout();
    console.log('User logged out');
  }
}
