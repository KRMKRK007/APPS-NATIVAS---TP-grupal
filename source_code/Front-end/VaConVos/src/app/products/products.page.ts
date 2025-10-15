import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProductsPage implements OnInit {
  categoria: string = '';
  products: Product[] = [];

  // Mapeo de nombre de categoría a id_categoria
  categoriaMap: { [key: string]: number } = {
    'Frutas y Verduras': 1,
    'Carnes': 2,
    'Almacen': 3,
    'Bebidas': 4
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.categoria = params.get('categoria') || '';
      if (this.categoria) {
        const allProducts = await this.productService.getAllProducts();
        const categoriaId = this.categoriaMap[this.categoria] || 0;
        this.products = allProducts.filter(p => p.id_categoria === categoriaId);
      }
    });
  }
}