// src/app/tab1/tab1.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa el Router
import {   
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon,
  IonList, IonItem, IonLabel,
  IonFooter, IonTabBar, IonTabButton, IonSpinner
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonIcon,
    IonList, IonItem, IonLabel,
    IonFooter, IonTabBar, IonTabButton, IonSpinner,
    ExploreContainerComponent 
  ]
})
export class Tab1Page implements OnInit {
  
  categories: any[] = [];
  isLoading = true;

  // Inyecta el Router junto con el servicio
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.isLoading = false;
      }
    });
  }

  // --- AÑADE ESTA FUNCIÓN ---
  // Navega a la página de productos pasando el ID de la categoría
  openCategory(categoryId: number) {
    this.router.navigate(['/products', categoryId]);
  }
}