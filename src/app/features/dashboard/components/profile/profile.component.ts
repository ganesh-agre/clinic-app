import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">User Profile</h1>
    </div>
  `,
  standalone: true,
})
export class ProfileComponent implements OnInit {
  userProfile = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    // TODO: Load profile data from service
  }

  updateProfile(): void {
    // TODO: Update profile data
  }
}
