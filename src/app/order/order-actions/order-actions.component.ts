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
  @Output() deleteOrder = new EventEmitter<number | string>();
  @Output() loadOrders = new EventEmitter<Order>();
  @Output() editOrder = new EventEmitter<Order>();

  constructor(private orderService: OrderService) { }

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value as Order['status'];
    if (this.order && this.order._id) {
      this.order.status = newStatus;
      this.updateOrder(this.order);
    } else {
      console.error("Order or Order ID is undefined");
    }
  }

  updateOrder(order: Order): void {

    this.orderService.updateOrder(order._id!,order).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.error("Error updating order status:", error);
      }
    });
  }

  onDelete(id: number | string): void {
    this.deleteOrder.emit(id);
  }


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
