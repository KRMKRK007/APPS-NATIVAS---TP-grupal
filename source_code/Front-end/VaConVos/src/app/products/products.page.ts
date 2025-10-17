import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

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

  categoriaMap: { [key: string]: number } = {
    'Frutas y Verduras': 1,
    'Carnes': 2,
    'Almacen': 3,
    'Bebidas': 4
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.categoria = params.get('categoria') || '';
      const id = this.categoriaMap[this.categoria] || 0;
      this.products = id ? await this.productService.getByCategoryId(id) : [];
    });
  }

  agregarAlCarrito(product: Product) {
    this.cartService.addToCart(product);
  }
}