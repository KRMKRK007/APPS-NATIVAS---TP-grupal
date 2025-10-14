import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonThumbnail,
  IonFooter, IonTabBar, IonTabButton, IonSearchbar
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProductoService } from '../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonButton, IonIcon,
    IonList, IonItem, IonLabel, IonThumbnail,
    IonFooter, IonTabBar, IonTabButton, ExploreContainerComponent,
    CommonModule, IonSearchbar
  ]
})
export class Tab1Page implements OnInit {

  productosDestacados: any[] = [];
  productosFiltrados: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getDestacados().subscribe(data => {
      this.productosDestacados = data;
      this.productosFiltrados = data;
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.productosFiltrados = this.productosDestacados.filter((producto) => {
      return producto.nombre.toLowerCase().includes(query);
    });
  }
}