// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    if (!environment.supabaseUrl || !environment.supabaseKey) {
      throw new Error("Las credenciales de Supabase no están en environment.ts");
    }
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Buscar productos por nombre (case-insensitive)
  async searchProductsByName(term: string) {
    const { data, error } = await this.supabase
      .from('producto')
      .select('id_producto, nombre, descripcion, precio, id_categoria')
      .ilike('nombre', `%${term}%`)
      .order('nombre', { ascending: true });

    if (error) throw error;
    return data;
  }
  
    async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}