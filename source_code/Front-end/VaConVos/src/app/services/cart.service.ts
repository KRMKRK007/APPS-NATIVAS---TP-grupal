import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  // Estado
  getCart(): CartItem[] {
    return this.cart;
  }
  cartChanges(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }
  private emit() {
    // emitimos una copia para disparar change detection
    this.cartSubject.next([...this.cart]);
  }

  // Operaciones
  addToCart(product: any): void {
    const found = this.cart.find(i => i.id_producto === product.id_producto);
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
    this.emit();
  }

  increaseQuantity(id_producto: number): void {
    const item = this.cart.find(i => i.id_producto === id_producto);
    if (item) {
      item.cantidad += 1;
      this.emit();
    }
  }

  decreaseQuantity(id_producto: number): void {
    const item = this.cart.find(i => i.id_producto === id_producto);
    if (!item) return;
    if (item.cantidad > 1) {
      item.cantidad -= 1;
      this.emit();
    } else {
      this.removeItem(id_producto);
    }
  }

  removeItem(id_producto: number): void {
    this.cart = this.cart.filter(i => i.id_producto !== id_producto);
    this.emit();
  }

  clearCart(): void {
    this.cart = [];
    this.emit();
  }

  getTotal(): number {
    return this.cart.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  }

  // Persistencia en backend
  saveCartToDB(paymentMethod: string) {
    return this.http.post(this.apiUrl, {
      items: this.cart,
      paymentMethod
    });
  }
}