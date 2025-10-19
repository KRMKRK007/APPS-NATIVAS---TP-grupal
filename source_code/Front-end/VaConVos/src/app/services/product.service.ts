import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SupabaseService } from './supabase.service';

export interface Product {
  id_producto: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  id_categoria: number;
  imagen_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient, private supabase: SupabaseService) {}

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

  // Búsqueda por nombre usando Supabase (ilike)
  async searchProductsByName(term: string): Promise<Product[]> {
    const t = (term || '').trim();
    if (!t) return this.getAllProducts();
    try {
      const data = await this.supabase.searchProductsByName(t);
      return (data as Product[]) || [];
    } catch (e) {
      console.error('Search error:', e);
      return [];
    }
  }
}