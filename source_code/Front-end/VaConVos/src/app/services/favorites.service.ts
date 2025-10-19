import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    // Cargar favoritos del localStorage al inicializar
    this.loadFavoritesFromStorage();
  }

  // Obtener favoritos actuales
  getFavorites(): Product[] {
    return this.favoritesSubject.value;
  }

  // Verificar si un producto está en favoritos
  isFavorite(productId: number): boolean {
    return this.favoritesSubject.value.some(product => product.id_producto === productId);
  }

  // Toggle favorito (agregar/quitar)
  toggleFavorite(product: Product): boolean {
    const currentFavorites = this.favoritesSubject.value;
    const isCurrentlyFavorite = this.isFavorite(product.id_producto);

    let newFavorites: Product[];

    if (isCurrentlyFavorite) {
      // Quitar de favoritos
      newFavorites = currentFavorites.filter(fav => fav.id_producto !== product.id_producto);
    } else {
      // Agregar a favoritos
      newFavorites = [...currentFavorites, product];
    }

    this.favoritesSubject.next(newFavorites);
    this.saveFavoritesToStorage(newFavorites);

    return !isCurrentlyFavorite; // Retorna el nuevo estado
  }

  // Agregar a favoritos
  addToFavorites(product: Product): void {
    if (!this.isFavorite(product.id_producto)) {
      const newFavorites = [...this.favoritesSubject.value, product];
      this.favoritesSubject.next(newFavorites);
      this.saveFavoritesToStorage(newFavorites);
    }
  }

  // Quitar de favoritos
  removeFromFavorites(productId: number): void {
    const newFavorites = this.favoritesSubject.value.filter(product => product.id_producto !== productId);
    this.favoritesSubject.next(newFavorites);
    this.saveFavoritesToStorage(newFavorites);
  }

  // Limpiar todos los favoritos
  clearFavorites(): void {
    this.favoritesSubject.next([]);
    this.saveFavoritesToStorage([]);
  }

  // Guardar favoritos en localStorage
  private saveFavoritesToStorage(favorites: Product[]): void {
    try {
      localStorage.setItem('va-con-vos-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn('Error al guardar favoritos en localStorage:', error);
    }
  }

  // Cargar favoritos desde localStorage
  private loadFavoritesFromStorage(): void {
    try {
      const stored = localStorage.getItem('va-con-vos-favorites');
      if (stored) {
        const favorites = JSON.parse(stored);
        this.favoritesSubject.next(favorites);
      }
    } catch (error) {
      console.warn('Error al cargar favoritos desde localStorage:', error);
      this.favoritesSubject.next([]);
    }
  }

  // Obtener cantidad de favoritos
  getFavoritesCount(): number {
    return this.favoritesSubject.value.length;
  }
}