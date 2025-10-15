import { Injectable } from '@angular/core';

export interface Product {
  // Define the properties of your product here, for example:
  id: number;
  name: string;
  price: number;
  // Add more fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  constructor() { }

  getCart(): Product[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    this.cart.push(product);
  }
}