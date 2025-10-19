// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { simAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs/tab1', pathMatch: 'full' },

  { path: 'tabs', loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes) },

  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./register/register.page').then(m => m.RegisterPage) },

  { path: 'products/:categoria', loadComponent: () => import('./products/products.page').then(m => m.ProductsPage) },

  { path: 'addresses', canMatch: [simAuthGuard], loadComponent: () => import('./addresses/addresses.page').then(m => m.AddressesPage) },
  { path: 'payment-methods', canMatch: [simAuthGuard], loadComponent: () => import('./payment-methods/payment-methods.page').then(m => m.PaymentMethodsPage) },
  { path: 'edit-profile', canMatch: [simAuthGuard], loadComponent: () => import('./edit-profile/edit-profile.page').then(m => m.EditProfilePage) },

  { path: '**', redirectTo: 'tabs/tab1' }
];