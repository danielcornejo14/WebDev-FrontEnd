import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from "../../shared/components/nav-menu/nav-menu.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DashboardComponent, RouterModule, CommonModule, NavMenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  sections = [
    { title: 'Gestión de Usuarios', description: 'Administra los usuarios de la plataforma.', buttonText: 'Ir a Gestión de Usuarios', icon: '👤', link: '/users/manageUsers' },
    { title: 'Gestión de Productos', description: 'Administra el catálogo de productos.', buttonText: 'Ir a Gestión de Productos', icon: '📦', link: '/products/manageProducts' },
    { title: 'Gestión de Pedidos', description: 'Administra los pedidos de productos.', buttonText: 'Ir a Gestión de Pedidos', icon: '📦', link: '/products/manageProducts' },
    { title: 'Estadísticas Detalladas', description: 'Visualiza estadísticas y métricas avanzadas.', buttonText: 'Ver Estadísticas', icon: '📊', link: '/stats' },
  ];
}
