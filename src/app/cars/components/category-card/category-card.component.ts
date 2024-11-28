import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Category } from '../../models/products/category';


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
    
  @Input()
  public category!: Category;

  @Output()
  public categorySelected = new EventEmitter<Category>();

  ngOnInit(): void {
    if(!this.category){
      throw new Error('Product is required');
    }
  }

  onCardClick(): void {
    this.categorySelected.emit(this.category);
  }

}
