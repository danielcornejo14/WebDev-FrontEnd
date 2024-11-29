import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../cars/models/orders/order';
import { OrderService } from './../../cars/services/order.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, MatDialogActions, MatDialogTitle, MatDialogContent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{

  order!: Order;
  showForm: boolean = true;

  constructor(private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
    const orderId = this.data._id;
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe({
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

  onClose(): void {
    this.dialogRef.close();
  }
}
