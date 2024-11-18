import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-discount-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './discount-card.component.html',
  styleUrl: './discount-card.component.scss'
})
export class DiscountCardComponent {

}
