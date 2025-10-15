import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id_producto: number;
  nombre: string;
  descripcion?: string; // Puede ser null en la base de datos
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
    return await this.http.get<Product[]>(this.apiUrl).toPromise() || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
}