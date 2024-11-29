import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Order } from '../../cars/models/orders/order';
import { OrderService } from './../../cars/services/order.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-actions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-actions.component.html',
  styleUrl: './order-actions.component.scss'
})
export class OrderActionsComponent {

  @Input() order!: Order;
  @Output() deleteUser = new EventEmitter<number | string>();
  @Output() loadOrders = new EventEmitter<Order>();
  @Output() editOrder = new EventEmitter<Order>();

  constructor(private orderService: OrderService) { }

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value as Order['status'];
    console.log("New status:", newStatus);
    console.log("Order:", this.order._id);
    if (this.order && this.order._id) {
      this.updateStatus(newStatus, this.order._id);
    } else {
      console.error("Order or Order ID is undefined");
    }
  }

  updateStatus(newStatus: Order['status'], id: number | string): void {
    this.orderService.updateOrder(id.toString(), newStatus).subscribe({
      next: () => {
        this.order.status = newStatus;
        console.log("Order status updated to:", newStatus);
      },
      error: (error) => {
        console.error("Error updating order status:", error);
      }
    });
  }

  onDelete(id: number | string): void {
    this.deleteUser.emit(id);
  }

  // onloadOrders(id: number | string): void {
  //   console.log("Loading orders...");
  //   this.loadOrders.emit(id);
  // }

  onEdit(order: Order): void {
    console.log(order._id);
    this.editOrder.emit(order);
  }

  cargarPedido(): void {
    console.log("Cargando pedido...");
    console.log("Order ID:", this.order.id);
    this.orderService.getOrderById(this.order.id.toString()).subscribe({
      next: order => {
        console.log("Order details:", order);
        this.order = order;
        console.log(this.order);
      },
      error: error => {
        console.error("Error fetching order details:", error);
      }
    });
  }

}
