import { Component, Input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posted-review',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule
  ],
  templateUrl: './posted-review.component.html',
  styleUrl: './posted-review.component.scss'
})
export class PostedReviewComponent {
  @Input() 
  review!:  { rating: number, comment: string, user: string };

}
