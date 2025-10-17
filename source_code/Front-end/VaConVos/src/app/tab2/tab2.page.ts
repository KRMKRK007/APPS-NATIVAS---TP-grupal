import { Component, OnDestroy } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonThumbnail,
  IonFooter, IonTabBar, IonTabButton, IonSelect, IonSelectOption, IonBadge
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CartService, CartItem } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonButton, IonIcon,
    IonList, IonItem, IonLabel, IonThumbnail,
    IonFooter, IonTabBar, IonTabButton, IonSelect, IonSelectOption, IonBadge,
    ExploreContainerComponent, CommonModule, FormsModule
  ]
})
export class Tab2Page implements OnDestroy {
  cartItems: CartItem[] = [];
  paymentMethod: string = '';
  paymentOptions = ['Tarjeta', 'Efectivo', 'Transferencia', 'Mercado Pago'];

  private sub?: Subscription;

  constructor(
    private cartService: CartService,
    private alertCtrl: AlertController
  ) {
    // Suscripción reactiva: actualiza la vista cuando cambie el carrito desde cualquier tab
    this.cartItems = this.cartService.getCart();
    this.sub = this.cartService.cartChanges().subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // Controles de cantidad
  increase(item: CartItem) {
    this.cartService.increaseQuantity(item.id_producto);
  }
  decrease(item: CartItem) {
    this.cartService.decreaseQuantity(item.id_producto);
  }
  remove(item: CartItem) {
    this.cartService.removeItem(item.id_producto);
  }

  // Totales
  getSubtotal(item: CartItem) {
    return item.precio * item.cantidad;
  }
  getTotal() {
    return this.cartService.getTotal();
  }

  async finalizarCompra() {
    if (!this.paymentMethod) {
      const alert = await this.alertCtrl.create({
        header: 'Selecciona un método de pago',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.cartService.saveCartToDB(this.paymentMethod).subscribe(async () => {
      const alert = await this.alertCtrl.create({
        header: '¡Compra realizada con éxito!',
        message: 'Gracias por tu compra.',
        buttons: ['OK']
      });
      await alert.present();
      this.cartService.clearCart();
      this.paymentMethod = '';
    });
  }

  trackById(_: number, item: CartItem) {
    return item.id_producto;
  }
}