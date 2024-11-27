import { AuthService } from './../../../cars/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRole } from '../../../cars/models/users/user-role';

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
      next: (response: UserRole)=> {
        // Verificar el rol del usuario después del login
         // admin, user, logistics
        let route = '/home';
        // TODO: create new routes
        switch (response) {
          case 'admin':
            route = '/home';
            break;
          case 'customer':
            route = '/home';
            break;
          case 'logistics':
            route = '/home';
            break;
          default:
            route = '/home';
            break;
        }
        this.router.navigate([route]);
      },
      error: error => {
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    });
  }

}
