// src/app/products/products.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Para leer parámetros de la URL
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonBackButton, IonList, IonItem, 
  IonLabel, IonThumbnail, IonButton, IonIcon, 
  IonSpinner, ToastController // Importa ToastController para notificaciones
} from '@ionic/angular/standalone';

import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButtons, IonBackButton, IonList, IonItem, 
    IonLabel, IonThumbnail, IonButton, IonIcon, 
    IonSpinner
  ]
})
export class ProductsPage implements OnInit {
  products: any[] = [];
  categoryId: number = 0;
  categoryName: string = 'Productos'; // Título por defecto
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private toastController: ToastController // Inyecta el ToastController
  ) { }

  ngOnInit() {
    // Obtiene el ID de la categoría de los parámetros de la ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.categoryId = +idParam; // El '+' convierte el string a número
      this.loadProducts();
    }
  }

  loadProducts() {
    this.isLoading = true;
    this.apiService.getProducts(this.categoryId).subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
        // Opcional: Podríamos obtener el nombre de la categoría también si la API lo proveyera
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.isLoading = false;
      }
    });
  }

  // Añade un producto al carrito
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.presentToast(`${product.name} añadido al carrito`);
  }

  // Muestra una notificación (toast)
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500, // Duración de 1.5 segundos
      position: 'bottom', // Posición en la parte inferior
      color: 'success'
    });
    toast.present();
  }
}