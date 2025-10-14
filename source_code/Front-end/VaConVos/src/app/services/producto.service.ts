import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  getDestacados() {
    // Aquí, en el futuro, haríamos una llamada a una API real.
    // Por ahora, usamos datos de prueba.
    return of([
      { id: 1, nombre: 'Frutas y verduras', icono: 'basket-outline' },
      { id: 2, nombre: 'Carnes', icono: 'restaurant-outline' },
      { id: 3, nombre: 'Supermercado', icono: 'storefront-outline' }
    ]);
  }
}