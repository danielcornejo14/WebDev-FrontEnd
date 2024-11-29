
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements AfterViewInit{

  activeTab = 'products';
  charts: { [key: string]: Chart } = {};
  
  metrics = [
    {
      title: 'Ingresos Totales',
      value: '$38,400',
      trend: '+20.1% respecto al período anterior',
      icon: 'icon-dollar'
    },
    {
      title: 'Pedidos',
      value: '381',
      trend: '+15% respecto al período anterior',
      icon: 'icon-cart'
    },
    {
      title: 'Usuarios Activos',
      value: '2,845',
      trend: '+180 nuevos usuarios',
      icon: 'icon-users'
    },
    {
      title: 'Tasa de Conversión',
      value: '3.2%',
      trend: '+0.5% respecto al período anterior',
      icon: 'icon-trend'
    }
  ];

  tabs = [
    { id: 'products', label: 'Productos Más Vendidos' },
    { id: 'users', label: 'Usuarios Activos' },
    { id: 'orders', label: 'Pedidos Diarios' }
  ];

  // Mock data
  topProducts = [
    { name: 'Smartphone X', sales: 200 },
    { name: 'Laptop Pro', sales: 98 },
    { name: 'Tablet Mini', sales: 86 },
    { name: 'Smartwatch', sales: 72 },
    { name: 'Auriculares BT', sales: 65 }
  ];

  dailyUsers = [
    { date: '2024-02-15', value: 245 },
    { date: '2024-02-16', value: 288 },
    { date: '2024-02-17', value: 256 },
    { date: '2024-02-18', value: 311 },
    { date: '2024-02-19', value: 275 },
    { date: '2024-02-20', value: 298 },
    { date: '2024-02-21', value: 322 }
  ];

  dailyOrders = [
    { date: '2024-02-15', value: 45, revenue: 4500 },
    { date: '2024-02-16', value: 52, revenue: 5200 },
    { date: '2024-02-17', value: 48, revenue: 4800 },
    { date: '2024-02-18', value: 61, revenue: 6100 },
    { date: '2024-02-19', value: 55, revenue: 5500 },
    { date: '2024-02-20', value: 58, revenue: 5800 },
    { date: '2024-02-21', value: 62, revenue: 6200 }
  ];

  ngAfterViewInit() {
    this.initializeCharts();
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
    this.updateChart(tabId);
  }

  onPeriodChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    console.log('Período seleccionado:', select.value);
    // Aquí iría la lógica para actualizar los datos según el período
    // Simulate data update based on selected period
    if (select.value === '24h') {
      this.topProducts = [
        { name: 'Smartphone X', sales: 120 },
        { name: 'Laptop Pro', sales: 98 },
        { name: 'Tablet Mini', sales: 86 },
        { name: 'Smartwatch', sales: 72 },
        { name: 'Auriculares BT', sales: 65 }
        ];
      this.dailyUsers = [
      { date: '2024-02-08', value: 220 },
      { date: '2024-02-09', value: 230 },
      { date: '2024-02-10', value: 240 },
      { date: '2024-02-11', value: 250 },
      { date: '2024-02-12', value: 260 },
      { date: '2024-02-13', value: 270 },
      { date: '2024-02-14', value: 280 }
      ];
      this.dailyOrders = [
      { date: '2024-02-08', value: 40, revenue: 4000 },
      { date: '2024-02-09', value: 42, revenue: 4200 },
      { date: '2024-02-10', value: 44, revenue: 4400 },
      { date: '2024-02-11', value: 46, revenue: 4600 },
      { date: '2024-02-12', value: 48, revenue: 4800 },
      { date: '2024-02-13', value: 50, revenue: 5000 },
      { date: '2024-02-14', value: 52, revenue: 5200 }
      ];
    } else if (select.value === '7d') {
      this.topProducts = [
        { name: 'Smartphone X', sales: 120 },
        { name: 'Laptop Pro', sales: 98 },
        { name: 'Tablet Mini', sales: 86 },
        { name: 'Smartwatch', sales: 72 },
        { name: 'Auriculares BT', sales: 65 }
        ];
      this.dailyUsers = [
      { date: '2024-01-15', value: 200 },
      { date: '2024-01-16', value: 210 },
      { date: '2024-01-17', value: 220 },
      { date: '2024-01-18', value: 230 },
      { date: '2024-01-19', value: 240 },
      { date: '2024-01-20', value: 250 },
      { date: '2024-01-21', value: 260 }
      ];
      this.dailyOrders = [
      { date: '2024-01-15', value: 35, revenue: 3500 },
      { date: '2024-01-16', value: 37, revenue: 3700 },
      { date: '2024-01-17', value: 39, revenue: 3900 },
      { date: '2024-01-18', value: 41, revenue: 4100 },
      { date: '2024-01-19', value: 43, revenue: 4300 },
      { date: '2024-01-20', value: 45, revenue: 4500 },
      { date: '2024-01-21', value: 47, revenue: 4700 }
      ];}

      else if (select.value === '30d') {
      this.topProducts = [
        { name: 'Smartphone X', sales: 120 },
        { name: 'Laptop Pro', sales: 98 },
        { name: 'Tablet Mini', sales: 86 },
        { name: 'Smartwatch', sales: 72 },
        { name: 'Auriculares BT', sales: 65 }
        ];
      this.dailyUsers = [
      { date: '2024-01-15', value: 200 },
      { date: '2024-01-16', value: 210 },
      { date: '2024-01-17', value: 220 },
      { date: '2024-01-18', value: 230 },
      { date: '2024-01-19', value: 240 },
      { date: '2024-01-20', value: 250 },
      { date: '2024-01-21', value: 260 }
      ];
      this.dailyOrders = [
      { date: '2024-01-15', value: 35, revenue: 3500 },
      { date: '2024-01-16', value: 37, revenue: 3700 },
      { date: '2024-01-17', value: 39, revenue: 3900 },
      { date: '2024-01-18', value: 41, revenue: 4100 },
      { date: '2024-01-19', value: 43, revenue: 4300 },
      { date: '2024-01-20', value: 45, revenue: 4500 },
      { date: '2024-01-21', value: 47, revenue: 4700 }
      ];}
      else if (select.value === '90d') {
        this.topProducts = [
          { name: 'Smartphone X', sales: 120 },
          { name: 'Laptop Pro', sales: 98 },
          { name: 'Tablet Mini', sales: 86 },
          { name: 'Smartwatch', sales: 72 },
          { name: 'Auriculares BT', sales: 65 }
          ];
        this.dailyUsers = [
        { date: '2024-01-15', value: 200 },
        { date: '2024-01-16', value: 210 },
        { date: '2024-01-17', value: 220 },
        { date: '2024-01-18', value: 230 },
        { date: '2024-01-19', value: 240 },
        { date: '2024-01-20', value: 250 },
        { date: '2024-01-21', value: 260 }
        ];
        this.dailyOrders = [
        { date: '2024-01-15', value: 35, revenue: 3500 },
        { date: '2024-01-16', value: 37, revenue: 3700 },
        { date: '2024-01-17', value: 39, revenue: 3900 },
        { date: '2024-01-18', value: 41, revenue: 4100 },
        { date: '2024-01-19', value: 43, revenue: 4300 },
        { date: '2024-01-20', value: 45, revenue: 4500 },
        { date: '2024-01-21', value: 47, revenue: 4700 }
        ];
    }
    this.updateChart(this.activeTab);
  }

  private initializeCharts() {
   // Productos más vendidos - Gráfico de barras
   const productsChartElement = document.getElementById('productsChart') as HTMLCanvasElement;
    if (productsChartElement) {
      this.charts['products'] = new Chart(productsChartElement, {
        type: 'bar',
        data: {
          labels: this.topProducts.map(p => p.name),
          datasets: [{
            label: 'Ventas',
            data: this.topProducts.map(p => p.sales),
            backgroundColor: '#1e40af',
            borderColor: '#1e40af',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // Usuarios activos - Gráfico de línea
    const usersChartElement = document.getElementById('usersChart') as HTMLCanvasElement;
    if (usersChartElement) {
      this.charts['users'] = new Chart(usersChartElement, {
        type: 'line',
        data: {
          labels: this.dailyUsers.map(d => d.date),
          datasets: [{
            label: 'Usuarios Activos',
            data: this.dailyUsers.map(d => d.value),
            borderColor: '#1e40af',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // Pedidos diarios - Gráfico de línea
    const ordersChartElement = document.getElementById('ordersChart') as HTMLCanvasElement;
    if (ordersChartElement) {
      this.charts['orders'] = new Chart(ordersChartElement, {
        type: 'line',
        data: {
          labels: this.dailyOrders.map(d => d.date),
          datasets: [{
            label: 'Pedidos Diarios',
            data: this.dailyOrders.map(d => d.value),
            borderColor: '#1e40af',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

  }

  private updateChart(tabId: string) {
    if (this.charts[tabId]) {
      this.charts[tabId].update();
    }
  }
}