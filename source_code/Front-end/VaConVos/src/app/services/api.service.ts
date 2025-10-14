// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // La URL base de tu backend. Asegúrate de que tu backend esté corriendo.
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /**
   * Documentación: Obtiene todas las categorías de la base de datos.
   * @returns Un Observable con un array de categorías.
   */
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/categories`);
  }

  /**
   * Documentación: Obtiene todos los productos.
   * Opcionalmente puede filtrar por el ID de una categoría.
   * @param categoryId - El ID (opcional) de la categoría por la cual filtrar.
   * @returns Un Observable con un array de productos.
   */
  getProducts(categoryId?: number): Observable<any[]> {
    let url = `${this.API_URL}/products`;
    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }
    return this.http.get<any[]>(url);
  }

  /**
   * Documentación: Obtiene el historial de pedidos para un usuario específico.
   * NOTA: Por ahora, el ID del usuario está fijo (hardcodeado) a 1.
   * En el futuro, esto debería ser dinámico basado en el usuario que ha iniciado sesión.
   * @param userId - El ID del usuario.
   * @returns Un Observable con un array de pedidos.
   */
  getOrders(userId: number = 1): Observable<any[]> {
    // En una app real, el backend debería filtrar por el usuario autenticado.
    // Aquí simulamos que obtenemos los pedidos del usuario con ID 1.
    return this.http.get<any[]>(`${this.API_URL}/orders?userId=${userId}`);
  }

  /**
   * Documentación: Envía un nuevo pedido al backend.
   * @param orderData - Un objeto que contiene los detalles del pedido.
   * @returns Un Observable con el pedido recién creado.
   */
  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/orders`, orderData);
  }
}