import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CartItem } from './cart.service';

export interface Order {
  id: string | number;
  fecha: string;
  total: number;
  payment_method: string;
  items: CartItem[];
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  async createOrder(items: CartItem[], paymentMethod: string): Promise<Order> {
    const res = await firstValueFrom(
      this.http.post<Order>(this.apiUrl, { items, paymentMethod })
    );
    return res;
  }

  async getOrderHistory(): Promise<Order[]> {
    const res = await firstValueFrom(this.http.get<Order[]>(this.apiUrl));
    return res || [];
  }
}