import { Component } from '@angular/core';
import { MatIconButton } from '../../../../node_modules/@angular/material/button/index';
import { MatIcon } from '@angular/material/icon';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatIconButton, MatIcon, MatDialogClose],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign In</h2>
          <p class="text-sm text-gray-500">Sign in to your account to continue shopping</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {}
