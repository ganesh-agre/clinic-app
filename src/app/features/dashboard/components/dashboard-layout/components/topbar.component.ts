import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-topbar',
  template: `<!-- src/app/shared/topbar/topbar.component.html -->
    <div class="bg-gray-800 text-white flex items-center justify-between px-6 py-4">
      <div class="text-xl font-semibold">SimpleChime</div>
      <div>
        <!-- Add user profile or notifications here -->
        <button class="text-white">Profile</button>
      </div>
    </div>`,
})
export class TopbarComponent {}
