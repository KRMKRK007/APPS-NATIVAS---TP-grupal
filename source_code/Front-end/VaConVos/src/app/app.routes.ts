// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs/tab1', pathMatch: 'full' },

  // Tabs sin guard (login ya no es obligatorio)
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes) },

  // Mantén estas rutas si las usabas en otros lugares
  { path: 'products/:categoria', loadComponent: () => import('./products/products.page').then(m => m.ProductsPage) },

  // (Opcional) Dejas /login y /register si las querés como páginas aparte
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./register/register.page').then(m => m.RegisterPage) },

  // Tabs protegidas
  {
    path: 'tabs',
    canMatch: [authGuard],
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes),
  },

  // Rutas adicionales que ya usas
  { path: 'products/:categoria', loadComponent: () => import('./products/products.page').then(m => m.ProductsPage) },

  { path: '**', redirectTo: 'login' }
];