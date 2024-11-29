import { User } from './../../../cars/models/users/user';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from "../search-box/search-box.component";
import { AuthService } from './../../../cars/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    SearchBoxComponent,
    CommonModule,
],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  @Output() editUser = new EventEmitter<User>();

  constructor(
    private authService: AuthService,
    private routerLink: Router
  ) { }


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const userDetails = this.authService.getUserDetails();
      this.userRole = userDetails ? userDetails.role : null;
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = null;
    this.routerLink.navigate(['/home/landing']);
    
  }
  onEdit(user: User): void {
    this.editUser.emit(user);
  }

}
