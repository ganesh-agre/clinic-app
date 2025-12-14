import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar.component';
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  template: `<div class="flex min-h-screen">
    <!-- Sidebar (Fixed width) -->
    <app-sidebar class="w-20 bg-gray-800 text-white"></app-sidebar>

    <!-- Main Content Area (Flexible) -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar (optional) -->
      <div class="bg-white shadow-md">
        <!-- <app-topbar></app-topbar> -->
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 p-4 overflow-auto">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div> `,
  styles: [``],
})
export class AppDashboardLayoutComponent {}
