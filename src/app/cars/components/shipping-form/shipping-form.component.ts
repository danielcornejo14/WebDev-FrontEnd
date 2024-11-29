import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shipping-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.scss'
})
export class ShippingFormComponent {
  @Input()
  formGroup!: FormGroup;

  @Output() proceedToPayment = new EventEmitter<void>();

  isFieldInvalid(field: string): boolean {
    const control = this.formGroup.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onProceedToPayment(): void {
    if (this.formGroup.valid) {
      this.proceedToPayment.emit();
      console.log('Proceed to payment');
    }
  }

}
