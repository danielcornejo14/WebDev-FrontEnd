import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  sections = [
    { title: 'Gestión de Usuarios', description: 'Administra los usuarios de la plataforma.', buttonText: 'Ir a Gestión de Usuarios', icon: '👤', link: '/admin/manageUsers' },
    { title: 'Gestión de Pedidos', description: 'Administra los pedidos de productos.', buttonText: 'Ir a Gestión de Pedidos', icon: '📦', link: '/admin/manageOrders' },
    { title: 'Estadísticas Detalladas', description: 'Visualiza estadísticas y métricas avanzadas.', buttonText: 'Ver Estadísticas', icon: '📊', link: '/admin/stats' },
  ];
}
