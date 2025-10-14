// src/app/services/cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaz para definir la estructura de un producto en el carrito
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject mantiene el estado actual del carrito y permite a otros componentes suscribirse a sus cambios.
  private cart = new BehaviorSubject<CartItem[]>([]);
  
  constructor() { }

  /**
   * Documentación: Devuelve el contenido actual del carrito como un Observable.
   */
  getCart(): Observable<CartItem[]> {
    return this.cart.asObservable();
  }

  /**
   * Documentación: Añade un producto al carrito. Si el producto ya existe, incrementa su cantidad.
   * @param product - El producto a añadir.
   */
  addProduct(product: any) {
    const currentCart = this.cart.getValue();
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl
      });
    }

    // Emite el nuevo estado del carrito a todos los suscriptores.
    this.cart.next(currentCart);
  }

  /**
   * Documentación: Calcula el subtotal del carrito.
   */
  getSubtotal(): Observable<number> {
    return this.cart.pipe(
      map(items => items.reduce((acc, item) => acc + (item.price * item.quantity), 0))
    );
  }

  /**
   * Documentación: Vacía el carrito por completo (por ejemplo, después de una compra).
   */
  clearCart() {
    this.cart.next([]);
  }
}