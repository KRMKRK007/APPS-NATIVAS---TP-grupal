import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Product {
  id_producto: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  id_categoria: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await firstValueFrom(this.http.get<Product[]>(this.apiUrl));
      return products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getByCategoryId(idCategoria: number): Promise<Product[]> {
    const all = await this.getAllProducts();
    return all.filter(p => p.id_categoria === idCategoria);
  }
}