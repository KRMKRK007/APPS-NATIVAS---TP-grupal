import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private apiUrl = 'http://localhost:3000/api/cart'; // Tu endpoint para guardar el carrito

  constructor(private http: HttpClient) {}

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: any): void {
    const found = this.cart.find(item => item.id_producto === product.id_producto);
    if (found) {
      found.cantidad += 1;
    } else {
      this.cart.push({
        id_producto: product.id_producto,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: 1
      });
    }
  }

  clearCart(): void {
    this.cart = [];
  }

  saveCartToDB(paymentMethod: string) {
    // Aquí podrías enviar el carrito y el método de pago a tu backend
    return this.http.post(this.apiUrl, {
      items: this.cart,
      paymentMethod
    });
  }
}