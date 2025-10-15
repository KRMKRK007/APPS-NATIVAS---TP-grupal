import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private supabase: SupabaseService) { }

  getDestacados(): Observable<any[]> {
    // Hacemos la consulta a la tabla 'Producto' en Supabase
    const promise = this.supabase.Client
      .from('Producto') // El nombre de tu tabla
      .select('*');     // Seleccionamos todas las columnas

    // Convertimos la promesa que devuelve Supabase en un Observable
    return from(promise).pipe(
      map(response => response.data || [])
    );
  }
 async getProducts(): Promise<any[]> {
    const { data, error } = await this.supabase.Client
      .from('Producto')
      .select('*');
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    return data || [];
  }
}

