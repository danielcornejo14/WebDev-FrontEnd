import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../cars/models/orders/order';
import { OrderService } from './../../cars/services/order.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{

  @Input() orderId!: string;
  @Output() close = new EventEmitter<void>();

  order!: Order;
  showForm: boolean = true;

  constructor(private router: Router, private orderService: OrderService) {}

  closeModal(): void {
    this.close.emit();
    this.router.navigate(['/admin/manageOrders']);
  }

  ngOnInit(): void {
    if (this.orderId) {
      this.orderService.getOrderById(this.orderId).subscribe({
        next: order => {
          this.order = order;
          console.log(this.order);
        },
        error: error => {
          console.error("Error fetching order details:", error);
        }
      });
    }
  }
}
