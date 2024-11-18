import { Component } from '@angular/core';
import { NavMenuComponent } from '../../../shared/components/nav-menu/nav-menu.component';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [
    NavMenuComponent,
  ],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

}
