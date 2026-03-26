import { Component } from '@angular/core';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, 
  IonBadge, IonThumbnail, IonButton, IonIcon, IonButtons, IonSpinner,
  IonCard, IonCardContent, IonImg
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../services/order.service';

// Tipo de apoyo para la UI: agrega una propiedad opcional 'expanded'
type OrderUI = Order & { expanded?: boolean };

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, 
    IonBadge, IonThumbnail, IonButton, IonIcon, IonButtons, IonSpinner,
    IonCard, IonCardContent, IonImg, CommonModule, RouterModule
  ]
})
export class Tab3Page {
  orders: OrderUI[] = [];
  loading = false;
  error?: string;

  constructor(private orderService: OrderService) {}

  async ionViewWillEnter() {
    await this.loadOrders();
  }

  async loadOrders() {
    this.loading = true;
    this.error = undefined;
    try {
  const baseOrders = await this.orderService.getOrderHistory();
  // Agregar propiedad expanded para cada orden
  this.orders = baseOrders.map(order => ({ ...order, expanded: false }));
    } catch (e: any) {
      this.error = e?.message || 'No se pudo obtener el historial.';
    } finally {
      this.loading = false;
    }
  }

  async refreshOrders() {
    await this.loadOrders();
  }

  itemsCount(o: OrderUI) {
    return Array.isArray(o.items) ? o.items.reduce((acc, it: any) => acc + (it.cantidad || 0), 0) : 0;
  }

  // Nuevas funciones para estadísticas
  getTotalSpent(): number {
    return this.orders.reduce((total, order) => total + (order.total || 0), 0);
  }

  getTotalItems(): number {
    return this.orders.reduce((total, order) => total + this.itemsCount(order), 0);
  }

  // Funciones para expandir órdenes
  expandOrder(order: OrderUI) {
    // No hacer nada aquí, se maneja en toggleOrderExpansion
  }

  toggleOrderExpansion(order: OrderUI, event: Event) {
    event.stopPropagation();
    order.expanded = !order.expanded;
  }

  // Fallback de imagen para ion-img
  setDefaultImage(ev: CustomEvent) {
    const imgEl = ev?.target as HTMLImageElement | any;
    if (imgEl && 'src' in imgEl) {
      imgEl.src = 'assets/images/placeholder.svg';
    }
  }

  // Funciones de formato de fecha
  formatDate(fecha: string | Date): string {
    const date = new Date(fecha);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  }

  formatTime(fecha: string | Date): string {
    const date = new Date(fecha);
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return date.toLocaleTimeString('es-ES', options);
  }
}