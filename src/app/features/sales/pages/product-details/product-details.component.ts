import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(
    private router: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.router.paramMap.pipe(
      tap(() => this.handleProductDetails())
    ).subscribe();
  }

  handleProductDetails = () => {
    const productId: number = Number(this.router.snapshot.paramMap.get('id'));
    this.productService.getProduct(productId).pipe(
      tap(data => this.product = data)
    ).subscribe();
  }

  addToCart = () => {
    this.cartService.addToCart(new CartItem(this.product));
  }
}
