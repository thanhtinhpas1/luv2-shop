import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {
  totalPrice = 0.00;
  totalQuantity = 0;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus = () => {
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.pipe(
      tap(data => this.totalPrice = data)
    ).subscribe();
    // subscribe to the cart quantity
    this.cartService.totalQuantity.pipe(
      tap(data => this.totalQuantity = data)
    ).subscribe();
  }

}
