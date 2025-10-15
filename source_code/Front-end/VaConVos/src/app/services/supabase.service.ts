import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public Client: SupabaseClient;

  constructor() {
    this.Client = createClient(environment.supabaseUrl, environment.supabaseKey);
  }
}