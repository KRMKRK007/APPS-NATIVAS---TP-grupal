import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonThumbnail,
  IonFooter, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CartService, CartItem } from '../services/cart.service';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonButton, IonIcon,
    IonList, IonItem, IonLabel, IonThumbnail,
    IonFooter, IonTabBar, IonTabButton, ExploreContainerComponent, CommonModule]
})


export class Tab2Page {
  cartItems: CartItem[] = [];
  paymentMethod: string = '';
  paymentOptions = ['Tarjeta', 'Efectivo', 'Transferencia', 'Mercado Pago'];

  constructor(
    private cartService: CartService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.cartItems = this.cartService.getCart();
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
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
      this.cartItems = [];
      this.paymentMethod = '';
    });
  }
}