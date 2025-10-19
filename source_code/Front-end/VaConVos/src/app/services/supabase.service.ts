// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  public supabase!: SupabaseClient;
  private session$ = new BehaviorSubject<Session | null>(null);

  constructor() {
    if (!environment.supabaseUrl || !environment.supabaseKey) {
      console.warn('Las credenciales de Supabase no están configuradas en environment.ts');
      // No inicializar Supabase si no hay credenciales
      return;
    }
    
    try {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

      // Sesión inicial y cambios de sesión con manejo de errores
      this.supabase.auth.getSession()
        .then(({ data }) => this.session$.next(data.session ?? null))
        .catch(error => {
          console.warn('Error al obtener sesión de Supabase:', error);
          this.session$.next(null);
        });
        
      this.supabase.auth.onAuthStateChange((_event, session) => {
        try {
          this.session$.next(session ?? null);
        } catch (error) {
          console.warn('Error en cambio de estado de auth:', error);
        }
      });
    } catch (error) {
      console.warn('Error inicializando Supabase:', error);
    }
  }

  // Login
  async signIn(credentials: { email: string; password: string }): Promise<Session | null> {
    if (!this.supabase) {
      console.warn('Supabase no está inicializado');
      return null;
    }
    const { data, error } = await this.supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
    this.session$.next(data.session ?? null);
    return data.session ?? null;
  }

  // Registro (guarda en auth.users)
  async signUp(credentials: { email: string; password: string }): Promise<void> {
    const { error } = await this.supabase.auth.signUp(credentials);
    if (error) throw error;
  }

  // Obtener sesión actual
  async getSession(): Promise<Session | null> {
    if (!this.supabase) {
      console.warn('Supabase no está inicializado');
      return null;
    }
    const { data } = await this.supabase.auth.getSession();
    return data.session ?? null;
  }

  // Observable de sesión (si lo necesitás)
  sessionChanges() {
    return this.session$.asObservable();
  }

  // Logout
  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
    this.session$.next(null);
  }

  // Buscar productos por nombre (case-insensitive)
  async searchProductsByName(term: string) {
    const { data, error } = await this.supabase
      .from('producto')
      .select('id_producto, nombre, descripcion, precio, id_categoria, imagen_url')
      .ilike('nombre', `%${term}%`)
      .order('nombre', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getCurrentUserId(): Promise<string | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) return null;
    return data.user?.id ?? null;
  }

  // Guarda SOLO datos no sensibles en "mediopago"
  async addPaymentMethod(userId: string, card: { type: string; last4: string; expiry: string }) {
    const { data, error } = await this.supabase
      .from('mediopago')
      .insert({
        id_cliente: userId,
        tipo: card.type,
        numero_enmarcado: card.last4,
        vencimiento: card.expiry
      })
      .select('id_mediopago, tipo, numero_enmarcado, vencimiento')
      .single();

    if (error) throw error;
    return data;
  }

  async listPaymentMethods(userId: string) {
    const { data, error } = await this.supabase
      .from('mediopago')
      .select('id_mediopago, tipo, numero_enmarcado, vencimiento')
      .eq('id_cliente', userId)
      .order('id_mediopago', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}