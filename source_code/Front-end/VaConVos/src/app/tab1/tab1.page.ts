import { Component, OnInit } from '@angular/core';
import {   IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonThumbnail,
  IonFooter, IonTabBar, IonTabButton} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProductoService } from '../services/producto.service';
// Make sure the file '../services/product.service.ts' exists and is correctly named.
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonButton, IonIcon,
    IonList, IonItem, IonLabel, IonThumbnail,
    IonFooter, IonTabBar, IonTabButton, ExploreContainerComponent, CommonModule ]
})
export class Tab1Page implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductoService, private cartService: CartService) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log(`${product.Nombre} agregado al carrito`);
  }
  }
