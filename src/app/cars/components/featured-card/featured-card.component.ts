import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-featured-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './featured-card.component.html',
  styleUrl: './featured-card.component.scss'
})
export class FeaturedCardComponent {

}
