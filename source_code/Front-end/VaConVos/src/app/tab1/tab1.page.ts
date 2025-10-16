// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // <-- Importa el Router
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon,
  IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  // Asegúrate que los imports del @Component sean los correctos
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel]
})
export class Tab1Page implements OnInit {
  products: Product[] = [];
  categoriaSeleccionada: string = 'Almacen'; // o la que quieras por defecto

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    this.products = await this.productService.getAllProducts();
    // Si quieres filtrar por categoría, hazlo aquí
    // this.products = this.products.filter(p => p.id_categoria === 3); // ejemplo para Almacen
  }

  agregarAlCarrito(product: Product) {
    this.cartService.addToCart(product);
  }

verProductos(categoria: string) {
  this.router.navigate(['/products', categoria]);
}
}