import { User } from './../../cars/models/users/user';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {

  @Input() user!: User;
  @Output() saveUser = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>();

  showForm: boolean = true; // Indica si el modal está visible
  ngOnInit(): void {
    console.log('user', this.user);
  }
  // Abre el formulario modal
  openForm(user?: any): void {
    this.user = user || {}; // Si se pasa un usuario, se edita, si no, es nuevo
    this.showForm = true;
  }

  // Cierra el formulario modal
  closeModal(): void {
    this.close.emit();
  }

  submitForm(): void {
    this.saveUser.emit(this.user);
  }

  
}
