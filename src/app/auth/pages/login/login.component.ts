import { AuthService } from './../../../cars/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: response => {
        // Verificar el rol del usuario después del login
        const userRole = response.role; // admin, user, logistics 
        if (userRole === 'admin') {
          this.router.navigate(['/homeAdmin']);
        }
        if (userRole === 'user') {
          this.router.navigate(['/home']);
        }
        else {
          this.router.navigate(['/homeLogistics']); 
        }
      },
      error: error => {
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    });
  }

}
