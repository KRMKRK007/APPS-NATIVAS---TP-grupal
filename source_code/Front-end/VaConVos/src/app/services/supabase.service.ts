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
}