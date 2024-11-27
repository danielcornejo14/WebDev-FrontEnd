import { AuthService } from './../../../cars/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  //showPassword: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  // togglePassword(): void {
  //   this.showPassword = !this.showPassword;
  // }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit() {
    this.authService.register(this.email, this.password).subscribe({
      next: response => {
        // Redirigir al usuario a la página principal después del registro
        this.router.navigate(['/home']);
      },
      error: error => {
        this.errorMessage = 'Registration failed';
      }
    });
  }

}
