import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../cars/services/users.service';
import {User} from '../../cars/models/users/user';
import { CommonModule } from '@angular/common';
import { TableUsersComponent } from "../table-users/table-users.component";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormUserComponent } from "../form-user/form-user.component";

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, TableUsersComponent, FormsModule, RouterModule, FormUserComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  showForm: boolean = false;
  selectedUser: User | null = null;

  constructor(private usersService: UsersService) {} 

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(users => {
      
      this.users = users;
      this.filteredUsers = users;
    });
  }

  saveUser(user: User): void {
    if (user._id) {
      this.usersService.updateUser(user).subscribe((updatedUser: User) => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.filteredUsers = [...this.users];
      });
    } else {
      this.usersService.register(user.email, user.password).subscribe((newUser: User) => {
        this.users.push(newUser);
        this.filteredUsers = [...this.users];
      });
    }
    this.selectedUser = null;
    window.location.reload();
  }

  deleteUser(id: number | string): void {
    this.usersService.deleteUser(id).subscribe(success => {
      if (success) {
        this.users = this.users.filter(user => user.id !== id);
        this.filteredUsers = [...this.users];
      }
    });
    window.location.reload();

  }

  onEditUser(user: User): void {
    this.selectedUser = { ...user };
    this.showForm = true;
  }

  onNewUser() {
    const newUser: User = {
      id: '',
      email: '',
      password: '',
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.selectedUser = newUser;
  }

  closeForm(): void {
    this.selectedUser = null;
  }

  ngOnChanges(value: string): void {
    this.filteredUsers = this.users.filter(user => 
      user.email.toLowerCase().includes(value.toLowerCase())
    );
  }
}