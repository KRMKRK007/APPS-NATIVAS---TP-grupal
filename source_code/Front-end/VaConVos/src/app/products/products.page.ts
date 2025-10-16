import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
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

  // Mapeo de nombre de categoría a id_categoria
  categoriaMap: { [key: string]: number } = {
    'Frutas y Verduras': 1,
    'Carnes': 2,
    'Almacen': 3,
    'Bebidas': 4
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

// En src/app/products/products.page.ts

async ngOnInit() {
  this.route.paramMap.subscribe(async params => {
    this.categoria = params.get('categoria') || '';
    // --- NUESTROS ESPÍAS ---
    console.log('1. Categoría recibida de la URL:', this.categoria);

    if (this.categoria) {
      const allProducts = await this.productService.getAllProducts();
      // Mostramos los datos que llegaron de la API
      console.log('2. Datos recibidos del servicio (todos los productos):', allProducts);

      const categoriaId = this.categoriaMap[this.categoria] || 0;
      // Verificamos qué ID le corresponde a la categoría
      console.log('3. ID de categoría que se usará para filtrar:', categoriaId);

      this.products = allProducts.filter(p => p.id_categoria == categoriaId);
      // Vemos el resultado final después de filtrar
      console.log('4. Productos que quedan después del filtro:', this.products);
      // --- FIN DE LOS ESPÍAS ---
    }
  });
}

  agregarAlCarrito(product: Product) {
    this.cartService.addToCart(product);
  }
}