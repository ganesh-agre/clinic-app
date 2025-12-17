import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  // 🔹 Mock backend data
  private mockUser: UserProfile = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@clinic.com',
    phone: '+1 234 567 890',
    avatar: '',
  };

  // 🔹 GET profile
  getProfile(): Observable<UserProfile> {
    return of(this.mockUser).pipe(
      delay(600) // simulate API latency
    );
  }

  // 🔹 UPDATE profile
  updateProfile(profile: UserProfile): Observable<UserProfile> {
    this.mockUser = { ...profile };
    return of(this.mockUser).pipe(delay(600));
  }
}
