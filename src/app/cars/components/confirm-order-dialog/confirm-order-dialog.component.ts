import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-confirm-order-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirm-order-dialog.component.html',
  styleUrl: './confirm-order-dialog.component.scss'
})
export class ConfirmOrderDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderDialogComponent>,
    private router: Router
  ) {}

  closeDialog(): void {
    this.router.navigate(['/home/landing']);
    this.dialogRef.close(true);

  }

}
