import { Component, Input, OnInit} from '@angular/core';
import { Order } from '../../cars/models/orders/order';
import { OrderStatusComponent } from "../order-status/order-status.component";
import { OrderActionsComponent } from "../order-actions/order-actions.component";
import { NgModule } from '@angular/core';
import { OrderService } from './../../cars/services/order.service';

import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderStatusComponent, OrderActionsComponent, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  @Input() users: Order[] = [];
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  deleteOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== +orderId);
    });
  }
}
