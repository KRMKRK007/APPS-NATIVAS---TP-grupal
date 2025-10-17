import { Component } from '@angular/core';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonBadge, IonThumbnail
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../services/order.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonBadge, IonThumbnail, CommonModule]
})
export class Tab3Page {
  orders: Order[] = [];
  loading = false;
  error?: string;

  constructor(private orderService: OrderService) {}

  async ionViewWillEnter() {
    this.loading = true;
    this.error = undefined;
    try {
      this.orders = await this.orderService.getOrderHistory();
    } catch (e: any) {
      this.error = e?.message || 'No se pudo obtener el historial.';
    } finally {
      this.loading = false;
    }
  }

  itemsCount(o: Order) {
    return Array.isArray(o.items) ? o.items.reduce((acc, it: any) => acc + (it.cantidad || 0), 0) : 0;
  }
}