import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {

}
