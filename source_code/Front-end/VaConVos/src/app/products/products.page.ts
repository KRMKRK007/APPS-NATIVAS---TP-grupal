import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonButton, IonIcon, IonCard, IonCardContent, IonSegment, IonSegmentButton,
  IonLabel, IonImg
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonButton, IonIcon, IonCard, IonCardContent, IonSegment, IonSegmentButton,
    IonLabel, IonImg
  ]
})
export class ProductsPage implements OnInit {
  categoria: string = '';
  products: Product[] = [];

  categoriaMap: { [key: string]: number } = {
    'Frutas y Verduras': 1,
    'Carnes': 2,
    'Almacen': 3,
    'Bebidas': 4
  };

  // Datos de ejemplo por categoría para cuando no hay backend disponible
  productosEjemplo: { [key: string]: Product[] } = {
    'Frutas y Verduras': [
      { id_producto: 1, nombre: 'Manzanas Rojas', descripcion: 'Frescas y dulces, perfectas para snacks', precio: 3.50, id_categoria: 1 },
      { id_producto: 2, nombre: 'Bananas', descripcion: 'Ideales para el desayuno', precio: 2.80, id_categoria: 1 },
      { id_producto: 3, nombre: 'Lechuga Orgánica', descripcion: 'Cultivada sin pesticidas', precio: 2.20, id_categoria: 1 },
      { id_producto: 4, nombre: 'Tomates Cherry', descripcion: 'Perfectos para ensaladas', precio: 4.50, id_categoria: 1 }
    ],
    'Carnes': [
      { id_producto: 5, nombre: 'Pechuga de Pollo', descripcion: 'Carne magra y tierna', precio: 12.90, id_categoria: 2 },
      { id_producto: 6, nombre: 'Carne Molida', descripcion: 'Perfecta para hamburguesas', precio: 15.50, id_categoria: 2 },
      { id_producto: 7, nombre: 'Salmón Fresco', descripcion: 'Rico en omega-3', precio: 25.00, id_categoria: 2 }
    ],
    'Almacen': [
      { id_producto: 8, nombre: 'Arroz Integral', descripcion: 'Rico en fibra y nutrientes', precio: 4.20, id_categoria: 3 },
      { id_producto: 9, nombre: 'Aceite de Oliva', descripcion: 'Extra virgen, primera presión', precio: 8.90, id_categoria: 3 },
      { id_producto: 10, nombre: 'Pasta Integral', descripcion: 'Elaborada con trigo integral', precio: 3.60, id_categoria: 3 }
    ],
    'Bebidas': [
      { id_producto: 11, nombre: 'Agua Mineral', descripcion: 'Natural y refrescante', precio: 1.50, id_categoria: 4 },
      { id_producto: 12, nombre: 'Jugo de Naranja', descripcion: '100% natural, sin conservantes', precio: 3.20, id_categoria: 4 },
      { id_producto: 13, nombre: 'Té Verde Orgánico', descripcion: 'Antioxidante natural', precio: 5.80, id_categoria: 4 }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.categoria = params.get('categoria') || '';
      console.log('Categoría recibida:', this.categoria);
      
      try {
        // Intentar obtener productos del backend
        const id = this.categoriaMap[this.categoria] || 0;
        console.log('ID de categoría mapeado:', id);
        
        if (id) {
          this.products = await this.productService.getByCategoryId(id);
          console.log('Productos del backend:', this.products.length);
          
          // Si no hay productos del backend, usar datos de ejemplo
          if (this.products.length === 0) {
            this.products = this.productosEjemplo[this.categoria] || [];
            console.log('Usando productos de ejemplo:', this.products.length);
          }
        } else {
          // Si no hay ID mapeado, usar productos de ejemplo
          this.products = this.productosEjemplo[this.categoria] || [];
          console.log('Categoría no mapeada, usando productos de ejemplo:', this.products.length);
        }
      } catch (error) {
        console.error('Error obteniendo productos del backend:', error);
        // En caso de error, usar datos de ejemplo
        this.products = this.productosEjemplo[this.categoria] || [];
        console.log('Error en backend, usando productos de ejemplo:', this.products.length);
      }
    });
  }

  agregarAlCarrito(product: Product) {
    this.cartService.addToCart(product);
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