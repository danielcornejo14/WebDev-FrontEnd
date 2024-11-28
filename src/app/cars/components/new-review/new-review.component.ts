import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/products/review';
import { AuthService } from '../../services/auth.service';


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
  productId!: number | string;
  
  reviewRating: number = 0;
  reviewComment: string = '';

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  submitReview() {
    /*const newReview: Review = {
      productId: this.productId,
      user: this.authService.getUserDetails().email,
      rating: this.reviewRating,
      comment: this.reviewComment,
    };

    console.log('Submitting review', newReview);

    this.reviewService.createReview(newReview).subscribe(
      (response) => {
        console.log('Review submitted successfully', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error submitting review', error);
      }
    );*/
  }



}
