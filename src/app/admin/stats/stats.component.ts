import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
export class StatsComponent implements OnInit,AfterViewInit{

  @ViewChild('productsChart') productsChartElement!: ElementRef;
  @ViewChild('usersChart') usersChartElement!: ElementRef;
  @ViewChild('ordersChart') ordersChartElement!: ElementRef;

  activeTab = 'users';
  charts: { [key: string]: Chart } = {};
  
  metrics = [
    {
      title: 'Ingresos Totales',
      value: '$38,400',
      trend: '+20.1% respecto al período anterior',
      icon: 'icon-dollar'
    },
    {
      title: 'Pedidos Realizados',
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
    { name: 'Chevrolet Bel Air', sales: 200 },
    { name: 'Ford Mustang 1965', sales: 98 },
    { name: 'BMW X5', sales: 86 },
    { name: 'Porsche 911', sales: 72 },
    { name: 'Mercedes-Benz SL500', sales: 65 }
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

  ngOnInit() {
    // Initialize the charts data
    this.initializeChartsData();
  }

  private initializeChartsData() {
    // Initialize the charts with default data
    this.topProducts = [
      { name: 'Chevrolet Bel Air', sales: 200 },
      { name: 'Ford Mustang 1965', sales: 98 },
      { name: 'BMW X5', sales: 86 },
      { name: 'Porsche 911', sales: 72 },
      { name: 'Mercedes-Benz SL500', sales: 65 }
    ];

    this.dailyUsers = [
      { date: '2024-02-15', value: 245 },
      { date: '2024-02-16', value: 288 },
      { date: '2024-02-17', value: 256 },
      { date: '2024-02-18', value: 311 },
      { date: '2024-02-19', value: 275 },
      { date: '2024-02-20', value: 298 },
      { date: '2024-02-21', value: 322 }
    ];

    this.dailyOrders = [
      { date: '2024-02-15', value: 45, revenue: 4500 },
      { date: '2024-02-16', value: 52, revenue: 5200 },
      { date: '2024-02-17', value: 48, revenue: 4800 },
      { date: '2024-02-18', value: 61, revenue: 6100 },
      { date: '2024-02-19', value: 55, revenue: 5500 },
      { date: '2024-02-20', value: 58, revenue: 5800 },
      { date: '2024-02-21', value: 62, revenue: 6200 }
    ];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeCharts();
    });
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
    this.updateChart(tabId);
  }

  onPeriodChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    console.log('Período seleccionado:', select.value);
    if (select.value === '24h') {
      this.topProducts = [
        { name: 'Pontiac GTO', sales: 152 },
        { name: 'Ford Hot Rod', sales: 102 },
        { name: 'Volkswagen Beetle', sales: 65 },
        { name: 'Audi A4', sales: 50 },
        { name: 'Mazda RX-7', sales: 30 }
        ];
      this.dailyUsers = [
        { date: '2024-02-15', value: 260 },
        { date: '2024-02-16', value: 310 },
        { date: '2024-02-17', value: 290 },
        { date: '2024-02-18', value: 340 },
        { date: '2024-02-19', value: 305 },
        { date: '2024-02-20', value: 330 },
        { date: '2024-02-21', value: 360 }
      ];
      this.dailyOrders = [
        { date: '2024-02-15', value: 50, revenue: 5000 },
        { date: '2024-02-16', value: 58, revenue: 5800 },
        { date: '2024-02-17', value: 53, revenue: 5300 },
        { date: '2024-02-18', value: 66, revenue: 6600 },
        { date: '2024-02-19', value: 60, revenue: 6000 },
        { date: '2024-02-20', value: 64, revenue: 6400 },
        { date: '2024-02-21', value: 68, revenue: 6800 }
      ];
    } else if (select.value === '7d') {
      this.topProducts = [
        { name: 'Dodge Charger', sales: 80 },
        { name: 'Chevrolet Bel Air', sales: 78 },
        { name: 'Mahindra Young', sales: 44 },
        { name: 'Honda Ray', sales: 23 },
        { name: 'Jaguar E-Type', sales: 20 }
        ];
      this.dailyUsers = [
        { date: '2024-02-15', value: 240 },
        { date: '2024-02-16', value: 275 },
        { date: '2024-02-17', value: 255 },
        { date: '2024-02-18', value: 300 },
        { date: '2024-02-19', value: 270 },
        { date: '2024-02-20', value: 290 },
        { date: '2024-02-21', value: 320 }
      ];
      this.dailyOrders = [
        { date: '2024-02-15', value: 47, revenue: 4700 },
        { date: '2024-02-16', value: 54, revenue: 5400 },
        { date: '2024-02-17', value: 50, revenue: 5000 },
        { date: '2024-02-18', value: 63, revenue: 6300 },
        { date: '2024-02-19', value: 57, revenue: 5700 },
        { date: '2024-02-20', value: 61, revenue: 6100 },
        { date: '2024-02-21', value: 66, revenue: 6600 }
      ];}

      else if (select.value === '30d') {
      this.topProducts = [
        { name: 'Audi A4', sales: 95 },
        { name: 'Toyota Supra MK4', sales: 84 },
        { name: 'Mercedes-Benz 190E', sales: 75 },
        { name: 'BMW X5', sales: 72 },
        { name: '	Tesla Roadster', sales: 30 }
        ];
      this.dailyUsers = [
        { date: '2024-02-15', value: 280 },
        { date: '2024-02-16', value: 320 },
        { date: '2024-02-17', value: 295 },
        { date: '2024-02-18', value: 350 },
        { date: '2024-02-19', value: 315 },
        { date: '2024-02-20', value: 340 },
        { date: '2024-02-21', value: 370 }
      ];
      this.dailyOrders = [
        { date: '2024-02-15', value: 55, revenue: 5500 },
        { date: '2024-02-16', value: 62, revenue: 6200 },
        { date: '2024-02-17', value: 57, revenue: 5700 },
        { date: '2024-02-18', value: 71, revenue: 7100 },
        { date: '2024-02-19', value: 65, revenue: 6500 },
        { date: '2024-02-20', value: 69, revenue: 6900 },
        { date: '2024-02-21', value: 73, revenue: 7300 }
      ];}
      else if (select.value === '90d') {
        this.topProducts = [
          { name: 'Peugeot 5008', sales: 120 },
          { name: 'Mercedes-Benz SL500', sales: 98 },
          { name: 'NIO ET6', sales: 86 },
          { name: 'Mercedes-Benz CMP', sales: 72 },
          { name: 'Volkswagen Golf', sales: 65 }
          ];
        this.dailyUsers = [
          { date: '2024-02-15', value: 230 },
          { date: '2024-02-16', value: 270 },
          { date: '2024-02-17', value: 250 },
          { date: '2024-02-18', value: 310 },
          { date: '2024-02-19', value: 280 },
          { date: '2024-02-20', value: 300 },
          { date: '2024-02-21', value: 335 }
        ];
        this.dailyOrders = [
          { date: '2024-02-15', value: 46, revenue: 4600 },
          { date: '2024-02-16', value: 53, revenue: 5300 },
          { date: '2024-02-17', value: 49, revenue: 4900 },
          { date: '2024-02-18', value: 64, revenue: 6400 },
          { date: '2024-02-19', value: 58, revenue: 5800 },
          { date: '2024-02-20', value: 62, revenue: 6200 },
          { date: '2024-02-21', value: 67, revenue: 6700 }
        ];
    }
    this.updateChart(this.activeTab);
    this.initializeCharts();
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
      // Update the chart data based on the current tab
      console.log('Updating chart:', tabId);
      switch(tabId) {
        case 'products':
          console.log('Updating products chart');
          console.log('Top products:', this.topProducts);
          this.charts['products'].data.labels = this.topProducts.map(p => p.name);
          this.charts['products'].data.datasets[0].data = this.topProducts.map(p => p.sales);

          break;
        case 'users':
          console.log('Updating users chart');
          console.log('Daily users:', this.dailyUsers);
          this.charts['users'].data.labels = this.dailyUsers.map(d => d.date);
          this.charts['users'].data.datasets[0].data = this.dailyUsers.map(d => d.value);
          break;
        case 'orders':
          console.log('Updating orders chart');
          console.log('Daily orders:', this.dailyOrders);
          this.charts['orders'].data.labels = this.dailyOrders.map(d => d.date);
          this.charts['orders'].data.datasets[0].data = this.dailyOrders.map(d => d.value);
          break;
      }
      
      // Trigger chart update
      this.charts[tabId].update();
    }
  }
}