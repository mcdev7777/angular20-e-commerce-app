import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    MatFormField,
    MatInput,
    MatPrefix,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatAnchor,
  ],
  template: `
    <div class="p-8 min-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign Up</h2>
          <p class="text-sm text-gray-500">Join us and start shopping today</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form [formGroup]="signUpForm" class="mt-6 flex flex-col">
        <mat-form-field class="mb-4">
          <input formControlName="name" matInput type="text" placeholder="Enter your name" />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input formControlName="email" matInput type="email" placeholder="Enter your email" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input
            formControlName="password"
            matInput
            type="password"
            placeholder="Enter your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input
            formControlName="confirmPassword"
            matInput
            type="password"
            placeholder="Confirm your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">Creating Account</button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);

  signUpForm = this.fb.group({
    name: ['John D', Validators.required],
    email: ['john@test.com', Validators.required],
    password: ['john123', Validators.required],
    confirmPassword: ['john123', Validators.required],
  });
}
