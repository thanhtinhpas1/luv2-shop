import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor(
  ) { }

  addToCart = (cartItem: CartItem) => {
    // check if we already have the item in our cart
    const existingCartItem = this.cartItems.find(item => item.id === cartItem.id);
    if (existingCartItem) {
      // increase the quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  decrementQuantity = (item: CartItem) => {
    item.quantity--;
    if (item.quantity === 0) {
      this.remove(item);
    } else {
      this.computeCartTotals();
    }
  }

  computeCartTotals = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
    for (const item of this.cartItems) {
      totalPrice += item.quantity * item.unitPrice;
      totalQuantity += item.quantity;
    }

    // publish the new values ... all subscribes receive the new data
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    // log cart data just for debugging purpose
    this.logCartData(totalPrice, totalQuantity);
  }

  logCartData = (totalValue: number, totalQuantity: number) => {
    console.log('Contents of the cart');
    for (const item of this.cartItems) {
      const subTotalPrice = item.quantity * item.unitPrice;
      console.log(`name: ${item.name}, quantity: ${item.quantity}, unitPrice:${item.unitPrice}, subPrice: ${subTotalPrice}`);
    }
    console.log(`totalPrice: ${this.totalPrice}, totalQuantity: ${this.totalQuantity}`);
  }

  remove = (cartItem: CartItem) => {
    // get index item in the array
    const itemIndex = this.cartItems.findIndex(item => item.id === cartItem.id);
    // if found, remove the item from the array at the given index
    if (itemIndex >= -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
