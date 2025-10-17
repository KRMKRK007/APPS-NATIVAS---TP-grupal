// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonSearchbar
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
    IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel, IonSearchbar,
    CommonModule
  ]
})
export class Tab1Page implements OnInit {
  // Lista visible en pantalla
  products: Product[] = [];
  // Cache con todos los productos (para filtrar localmente)
  private allProducts: Product[] = [];

  searchTerm = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    // Carga TODOS los productos una sola vez
    this.allProducts = await this.productService.getAllProducts();
    this.products = [...this.allProducts];
  }

  async onSearchInput(ev: any) {
    const value = (ev?.detail?.value || '').trim().toLowerCase();
    this.searchTerm = value;

    if (!value) {
      // Sin término: mostrar todos
      this.products = [...this.allProducts];
      return;
    }

    // Filtrar localmente por nombre o descripción
    this.products = this.allProducts.filter(p =>
      (p.nombre || '').toLowerCase().includes(value) ||
      (p.descripcion || '').toLowerCase().includes(value)
    );
  }

  agregarAlCarrito(product: Product) {
    this.cartService.addToCart(product);
  }

  verProductos(categoria: string) {
    this.router.navigate(['/products', categoria]);
  }

  trackById(_: number, p: Product) {
    return p.id_producto;
  }
}