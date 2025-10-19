import { Component, OnDestroy } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonThumbnail,
  IonFooter, IonTabBar, IonTabButton, IonSelect, IonSelectOption, IonBadge,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CartService, CartItem } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
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
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg,
    ExploreContainerComponent, CommonModule, FormsModule, RouterModule
  ]
})
export class Tab2Page implements OnDestroy {
  cartItems: CartItem[] = [];
  paymentMethod: string = '';
  paymentOptions = ['Tarjeta', 'Efectivo', 'Transferencia', 'Mercado Pago'];

  private sub?: Subscription;

  constructor(
    private cartService: CartService,
    private alertCtrl: AlertController,
    private orderService: OrderService,   // <-- nuevo
    private router: Router  
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

  // Vaciar carrito completo
  async clearCart() {
    const alert = await this.alertCtrl.create({
      header: 'Vaciar carrito',
      message: '¿Estás seguro de que quieres eliminar todos los productos del carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Vaciar',
          role: 'destructive',
          handler: () => {
            this.cartService.clearCart();
          }
        }
      ]
    });
    await alert.present();
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

    try {
      const items = this.cartItems;
      if (items.length === 0) return;

      await this.orderService.createOrder(items, this.paymentMethod);
      this.cartService.clearCart();
      this.paymentMethod = '';

      const ok = await this.alertCtrl.create({
        header: '¡Compra realizada con éxito!',
        message: 'Tu pedido fue registrado.',
        buttons: ['OK']
      });
      await ok.present();

      // Navega al historial
      this.router.navigateByUrl('/tabs/tab3');
    } catch (e: any) {
      const err = await this.alertCtrl.create({
        header: 'Error',
        message: e?.message || 'No se pudo registrar el pedido.',
        buttons: ['OK']
      });
      await err.present();
    }
  }

  trackById(_: number, item: CartItem) {
    return item.id_producto;
  }

  // Fallback de imagen para ion-img en carrito
  setDefaultImage(ev: CustomEvent) {
    const imgEl = ev?.target as HTMLImageElement | any;
    if (imgEl && 'src' in imgEl) {
      imgEl.src = 'assets/images/placeholder.svg';
    }
  }
}