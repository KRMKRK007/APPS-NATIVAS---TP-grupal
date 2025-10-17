// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  { path: 'products/:id', loadComponent: () => import('./products/products.page').then(m => m.ProductsPage) },
  { path: 'edit-profile', loadComponent: () => import('./edit-profile/edit-profile.page').then(m => m.EditProfilePage) },
  { path: 'addresses', loadComponent: () => import('./addresses/addresses.page').then(m => m.AddressesPage) },
  { path: 'payment-methods', loadComponent: () => import('./payment-methods/payment-methods.page').then(m => m.PaymentMethodsPage) },  {
    path: 'edit-profile',
    loadComponent: () => import('./edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'addresses',
    loadComponent: () => import('./addresses/addresses.page').then( m => m.AddressesPage)
  },
  {
    path: 'payment-methods',
    loadComponent: () => import('./payment-methods/payment-methods.page').then( m => m.PaymentMethodsPage)
  },

  // opcional: { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
];