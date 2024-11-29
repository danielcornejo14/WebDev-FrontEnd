import { OrderService } from './../../cars/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../cars/models/orders/order';
import { OrderListComponent } from "../order-list/order-list.component";
import { OrderActionsComponent } from '../order-actions/order-actions.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-dashboard',
  standalone: true,
  templateUrl: './order-dashboard.component.html',
  styleUrl: './order-dashboard.component.scss',
  imports: [OrderListComponent, CommonModule]
})
export class OrderDashboardComponent implements OnInit{
  orders : Order[] = [];
  filterOrders: Order[] = [];
  totalOrders: number = 0;
  pendingOrders: number = 0;
  shippedOrders: number = 0;
  deliveredOrders: number = 0;
  paidOrders: number = 0;
  selectedOrder: Order | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    console.log("Order Dashboard");
    this.loadOrders();
    this.filterOrders = this.orders;
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      console.log(orders);
      this.totalOrders = orders.length;
      this.pendingOrders = orders.filter((order: { status: string; }) => order.status === 'pending').length;
      this.shippedOrders = orders.filter((order: { status: string; }) => order.status === 'shipped').length;
      this.deliveredOrders = orders.filter((order: { status: string; }) => order.status === 'delivered').length;
      this.paidOrders = orders.filter((order: { status: string; }) => order.status === 'paid').length;
    });
  }
  

  ngOnChanges(value:string): void {
    this.filterOrders = this.orders.filter(order => 
      order.status.toLowerCase().includes(value.toLowerCase())
    );
    console.log(this.filterOrders);
  }


}
