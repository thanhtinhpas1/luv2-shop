import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails = () => {
    // get a handle to the cart item
    this.cartItems = this.cartService.cartItems;
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.pipe(
      tap(data => this.totalPrice = data)
    ).subscribe();
    // subscribe to the cart quantity
    this.cartService.totalQuantity.pipe(
      tap(data => this.totalQuantity = data)
    ).subscribe();
    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity = (item: CartItem) => {
    this.cartService.addToCart(item);
  }

  decrementQuantity = (item: CartItem) => {
    this.cartService.decrementQuantity(item);
  }

  remove = (item: CartItem) => {
    this.cartService.remove(item);
  }
}

