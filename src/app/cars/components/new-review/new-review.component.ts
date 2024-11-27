import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';


@Component({
  selector: 'app-new-review',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    InputTextareaModule
  ],
  templateUrl: './new-review.component.html',
  styleUrl: './new-review.component.scss'
})
export class NewReviewComponent {
  
  @Input()
  productId!: number;
  
  reviewRating: number = 0;
  reviewComment: string = '';



}
