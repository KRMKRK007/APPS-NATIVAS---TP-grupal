// src/app/products/products.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Para leer la URL
import { IonicModule } from '@ionic/angular';
import { ProductService } from '../services/product.service'; // Nuestro servicio

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProductsPage implements OnInit {
  public categoria: string | null = null;
  public products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    // Leemos el parámetro 'categoria' de la URL
    this.categoria = this.route.snapshot.paramMap.get('categoria');
    if (this.categoria) {
      // Pedimos los productos de esa categoría al servicio
      this.products = await this.productService.getProductsByCategory(this.categoria);
    }
  }
}