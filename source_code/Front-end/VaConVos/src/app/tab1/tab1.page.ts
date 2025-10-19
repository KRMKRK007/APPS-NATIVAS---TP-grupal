// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonSearchbar, IonCardContent, IonCard, IonImg
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
// ExploreContainerComponent removido - no se usa en el nuevo diseño
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, 
    IonSearchbar, IonCardContent, IonCard, IonImg
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
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  async ngOnInit() {
    try {
      // Carga TODOS los productos una sola vez
      this.allProducts = await this.productService.getAllProducts();
      this.products = [...this.allProducts];
      
      // Si no hay productos del backend, mostrar algunos de ejemplo
      if (this.products.length === 0) {
        this.products = [
          { id_producto: 1, nombre: 'Manzanas Rojas', descripcion: 'Frescas y dulces', precio: 3.50, id_categoria: 1 },
          { id_producto: 2, nombre: 'Pechuga de Pollo', descripcion: 'Carne magra y tierna', precio: 12.90, id_categoria: 2 },
          { id_producto: 3, nombre: 'Arroz Integral', descripcion: 'Rico en fibra', precio: 4.20, id_categoria: 3 },
          { id_producto: 4, nombre: 'Jugo de Naranja', descripcion: '100% natural', precio: 3.20, id_categoria: 4 }
        ];
        this.allProducts = [...this.products];
        console.log('Usando productos de ejemplo en tab1');
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      // En caso de error, mostrar productos de ejemplo
      this.products = [
        { id_producto: 1, nombre: 'Manzanas Rojas', descripcion: 'Frescas y dulces', precio: 3.50, id_categoria: 1 },
        { id_producto: 2, nombre: 'Pechuga de Pollo', descripcion: 'Carne magra y tierna', precio: 12.90, id_categoria: 2 }
      ];
      this.allProducts = [...this.products];
    }
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
    console.log('🚀 Navegando a productos, categoría:', categoria);
    
    // Usar la ruta directa sin tabs
    this.router.navigate(['/products', categoria])
      .then(success => {
        console.log('✅ Navegación exitosa:', success);
      })
      .catch(error => {
        console.error('❌ Error en navegación:', error);
      });
  }

  trackById(_: number, p: Product) {
    return p.id_producto;
  }

  // Nueva función para manejar favoritos
  toggleFavorite(product: Product, event: Event) {
    event.stopPropagation(); // Evitar que se propague el click
    this.favoritesService.toggleFavorite(product);
  }

  // Verificar si un producto está en favoritos
  isFavorite(product: Product): boolean {
    return this.favoritesService.isFavorite(product.id_producto);
  }

  // Fallback de imagen para ion-img
  setDefaultImage(ev: CustomEvent) {
    const imgEl = ev?.target as HTMLImageElement | any;
    if (imgEl && 'src' in imgEl) {
      imgEl.src = 'assets/images/placeholder.svg';
    }
  }
}