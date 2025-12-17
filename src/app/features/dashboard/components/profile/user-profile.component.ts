import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  inject,
  DestroyRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { UserProfile, UserProfileService } from './user-profile.service';
import { ToastComponent } from '../../../../shared/components/app-toast.component';
import { BehaviorSubject, catchError, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent],
  template: `
    <div class="flex justify-center">
      <div
        class="
          w-full max-w-3xl
          bg-slate-800
          border border-slate-700
          shadow-2xl shadow-black/40
          rounded-xl
          p-8
          mt-8
        "
      >
        <h2 class="text-2xl font-semibold mb-6 text-slate-100">User Profile</h2>

        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
          <!-- Full Name -->
          <div class="mb-4">
            <label class="block font-medium mb-1 text-slate-300"> Full Name </label>
            <input
              formControlName="name"
              placeholder="Enter full name"
              class="w-full rounded-md bg-slate-700 border border-slate-600
                     text-slate-100 placeholder-slate-400 p-2
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p
              *ngIf="name?.invalid && (name?.touched || name?.dirty)"
              class="text-red-400 text-sm mt-1"
            >
              Full name is required
            </p>
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label class="block font-medium mb-1 text-slate-300"> Email </label>
            <input
              formControlName="email"
              placeholder="Enter email"
              class="w-full rounded-md bg-slate-700 border border-slate-600
                     text-slate-100 placeholder-slate-400 p-2
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p
              *ngIf="email?.errors?.['required'] && (email?.touched || email?.dirty)"
              class="text-red-400 text-sm mt-1"
            >
              Email is required
            </p>
            <p
              *ngIf="email?.errors?.['email'] && (email?.touched || email?.dirty)"
              class="text-red-400 text-sm mt-1"
            >
              Enter a valid email address
            </p>
          </div>

          <!-- Phone -->
          <div class="mb-4">
            <label class="block font-medium mb-1 text-slate-300"> Phone </label>
            <input
              formControlName="phone"
              placeholder="Enter phone"
              class="w-full rounded-md bg-slate-700 border border-slate-600
                     text-slate-100 placeholder-slate-400 p-2
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <!-- Avatar -->
          <div class="mb-6">
            <label class="block font-medium mb-1 text-slate-300"> Profile Picture </label>
            <input type="file" (change)="onFileChange($event)" class="text-slate-300" />
            <img
              *ngIf="profilePicUrl"
              [src]="profilePicUrl"
              class="h-24 w-24 mt-3 rounded-full object-cover border border-slate-600"
            />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            [disabled]="profileForm.invalid"
            class="
              px-4 py-2 rounded-md font-medium
              bg-blue-600 text-white
              transition-all duration-200
              hover:bg-blue-700
              disabled:bg-slate-600
              disabled:text-slate-400
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {{ (loading$ | async) ? 'Loading...' : 'Save' }}
          </button>
        </form>

        <app-toast #toast></app-toast>
      </div>
    </div>
  `,
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profilePicUrl: string | null = null;

  @ViewChild('toast', { static: true })
  toast!: ToastComponent;

  loading$ = new BehaviorSubject<boolean>(false);
  destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });
    this.loading$.next(true);
    this.loadProfile();
  }

  // Safe getters
  get name(): AbstractControl | null {
    return this.profileForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.profileForm.get('email');
  }

  loadProfile(): void {
    this.userProfileService
      .getProfile()
      .pipe(
        finalize(() => this.loading$.next(false)),
        catchError((error) => {
          this.toast.show('Failde to load profile');
          return [];
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((profile) => {
        this.profileForm.patchValue(profile);
        this.profilePicUrl = profile.avatar ?? null;
      });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.profilePicUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const updatedProfile: UserProfile = {
      id: 1,
      ...this.profileForm.value,
      avatar: this.profilePicUrl ?? '',
    };

    this.userProfileService.updateProfile(updatedProfile).subscribe({
      next: () => this.toast.show('Profile updated successfully'),
      error: () => this.toast.show('Failed to update profile'),
    });
  }
}
