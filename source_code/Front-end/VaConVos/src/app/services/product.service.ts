import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs'; // 👈 PASO 1: Importar la nueva función

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

  constructor(private http: HttpClient) { }

  async getAllProducts(): Promise<Product[]> {
    try {
      // 👇 PASO 2: Usar la nueva función en lugar de .toPromise()
      const products = await firstValueFrom(this.http.get<Product[]>(this.apiUrl));
      return products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
}