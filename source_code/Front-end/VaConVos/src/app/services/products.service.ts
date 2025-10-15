// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service'; // Asegúrate que esta importación sea correcta

// Define una interfaz para tus productos para tener un código más limpio y seguro
export interface Product {
  id: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  // Agrega aquí otras propiedades si las tienes en tu tabla de Supabase
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private supabaseService: SupabaseService) { }

  async getProducts(): Promise<Product[]> {
    // Especifica el tipo de dato que esperas recibir con <Product[]>
    const { data, error } = await this.supabaseService.supabase
      .from('Producto') // Asegúrate que el nombre de la tabla "Producto" sea exacto
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    // Si 'data' no es nulo, lo retornas. Si es nulo, retornas un array vacío.
    return data || []; 
  }
}