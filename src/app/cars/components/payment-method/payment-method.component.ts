import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})
export class PaymentMethodComponent {

  @Input()
  formGroup!: FormGroup;

  @Output() proceedToReview = new EventEmitter<void>();

  isFieldInvalid(field: string): boolean {
    const control = this.formGroup.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  
  onProceedToReview(): void {
    if (this.formGroup.valid) {
      this.proceedToReview.emit();
      console.log('Proceed to payment');
    }
  }

}
