import { Component } from '@angular/core';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { FeaturedCardComponent } from '../../components/featured-card/featured-card.component';
import {MatDividerModule} from '@angular/material/divider';
import { DiscountCardComponent } from '../../components/discount-card/discount-card.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CategoryCardComponent,
    FeaturedCardComponent,
    MatDividerModule,
    DiscountCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
