import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-restock-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './restock-dialog.component.html',
  styleUrl: './restock-dialog.component.scss'
})
export class RestockDialogComponent {
  protected quantity: number = 0;

  constructor(
    private dialogRef: MatDialogRef<RestockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onRestock(): void {
    if(this.quantity > 10){
    this.dialogRef.close({ id: this.data._id, quantity: this.quantity });
    }
    else{
      alert("Quantity should be less than or equal to 10");
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
