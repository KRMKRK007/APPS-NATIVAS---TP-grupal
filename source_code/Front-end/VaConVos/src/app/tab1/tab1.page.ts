// src/app/tab1/tab1.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <-- Importa el Router
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon,
  IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  // Asegúrate que los imports del @Component sean los correctos
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel]
})
export class Tab1Page {
  // Inyecta el Router en el constructor
  constructor(private router: Router) {}

  verProductos(categoria: string) {
    // Navegamos a una nueva ruta que crearemos en el siguiente paso
    this.router.navigate(['/tabs/products', categoria]);
    console.log('Navegando a la categoría:', categoria);
  }
}