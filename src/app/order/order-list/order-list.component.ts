import { Component, inject, Input} from '@angular/core';
import { Order } from '../../cars/models/orders/order';
import { OrderStatusComponent } from "../order-status/order-status.component";
import { OrderActionsComponent } from "../order-actions/order-actions.component";
import { NgModule } from '@angular/core';
import { OrderService } from './../../cars/services/order.service';

import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderStatusComponent, OrderActionsComponent, CommonModule, MatDialogModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  @Input() orders: Order[] = [];
  private dialog: MatDialog = inject(MatDialog);
  constructor(
    private orderService: OrderService,
  ) {}

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  onEdit(order: Order): void {
    this.dialog.open(OrderDetailsComponent, {
      data: order
    }).afterClosed().subscribe(() => {
      this.loadOrders();
    });
  }

  deleteOrder(orderId: string | number): void {
    this.orderService.deleteOrder(orderId.toString()).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== +orderId);
      window.location.reload();
    });
  }
}
