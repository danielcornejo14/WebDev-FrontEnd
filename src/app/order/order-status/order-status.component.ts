import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {

  @Input() status!: string;

  get statusClass() {
    return {
      'status-pending': this.status === 'pending',
      'status-processing': this.status === 'processing',
      'status-shipped': this.status === 'shipped',
      'status-delivered': this.status === 'delivered',
    };
  }

}
