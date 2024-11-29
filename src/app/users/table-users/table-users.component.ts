import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService} from '../../cars/services/users.service';
import { User } from '../../cars/models/users/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.scss'
})
export class TableUsersComponent {
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<number | string>();

  onEdit(user: User): void {
    this.editUser.emit(user);
  }

  onDelete(id: number | string): void {
    this.deleteUser.emit(id);
  }
}
