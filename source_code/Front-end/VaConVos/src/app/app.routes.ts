// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  // --- AÑADE ESTA RUTA ---
  {
    path: 'products/:id', // La ruta incluye un parámetro dinámico 'id'
    loadComponent: () => import('./products/products.page').then( m => m.ProductsPage)
  },
  // ----------------------
];