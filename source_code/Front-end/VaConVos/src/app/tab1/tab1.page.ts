// src/app/tab1/tab1.page.ts

import { Component, OnInit } from '@angular/core';
import {   IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonThumbnail,
  IonFooter, IonTabBar, IonTabButton} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProductService } from '../services/products.service'; // <--- ESTA ES LA LÍNEA MÁS IMPORTANTE
import { CartService } from '../services/cart.service';     // <--- IMPORTAR
import { CommonModule } from '@angular/common';             // <--- IMPORTAR

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  // Asegúrate de que CommonModule esté en los imports
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonButton, IonIcon,
    IonList, IonItem, IonLabel, IonThumbnail,
    IonFooter, IonTabBar, IonTabButton, ExploreContainerComponent, CommonModule ]
})
export class Tab1Page implements OnInit { // <--- Implementar OnInit
  products: any[] = []; // <--- Crear un array para guardar los productos

  // Inyectar los servicios en el constructor
  constructor(private productService: ProductService, private cartService: CartService) {}

  // Este método se ejecuta cuando la página se carga
  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }

  // Función para agregar al carrito
  addToCart(producto: any) {
    this.cartService.addToCart(producto);
    console.log(`${producto.Nombre} agregado al carrito`);
  }
}