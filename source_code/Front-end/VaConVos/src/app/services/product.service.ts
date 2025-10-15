// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private supabaseService: SupabaseService) { }

  async getProductsByCategory(categoryName: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('Producto') // Nombre de tu tabla de productos
      .select('*')
      .eq('NombreCategoria', categoryName); // Nombre de tu columna de categoría

    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
    return data || [];
  }
}