// src/app/tab2/tab2.page.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonThumbnail,
  IonFooter, IonText, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '../services/cart.service';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonIcon,
    IonList, IonItem, IonLabel, IonThumbnail,
    IonFooter, IonText, IonGrid, IonRow, IonCol
  ]
})
export class Tab2Page {
  cartItems$: Observable<CartItem[]>;
  subtotal$: Observable<number>;

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private alertController: AlertController
  ) {
    this.cartItems$ = this.cartService.getCart();
    this.subtotal$ = this.cartService.getSubtotal();
  }

  // Lógica para finalizar la compra
  checkout() {
    let subtotalValue = 0;
    this.subtotal$.subscribe(s => subtotalValue = s).unsubscribe();

    let itemsForOrder: { productId: number, quantity: number, price: number }[] = [];
    this.cartItems$.subscribe(items => {
      itemsForOrder = items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }));
    }).unsubscribe();
    
    // NOTA: El userId está fijo (hardcodeado).
    const orderData = {
      userId: 1, 
      total: subtotalValue,
      notes: "Por favor, tocar timbre.", // Esto podría venir de un campo de texto
      items: itemsForOrder
    };

    this.apiService.createOrder(orderData).subscribe({
      next: async (res) => {
        // Muestra una alerta de éxito
        const alert = await this.alertController.create({
          header: '¡Pedido Realizado!',
          message: 'Tu pedido ha sido creado con éxito.',
          buttons: ['OK']
        });
        await alert.present();
        
        // Limpia el carrito
        this.cartService.clearCart();
      },
      error: async (err) => {
        // Muestra una alerta de error
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo crear el pedido. Inténtalo de nuevo.',
          buttons: ['OK']
        });
        await alert.present();
        console.error('Error al crear el pedido:', err);
      }
    });
  }
}