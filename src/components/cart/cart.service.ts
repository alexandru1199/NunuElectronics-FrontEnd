import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    // Verificăm dacă suntem în browser înainte de a accesa localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      }
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.productName === item.productName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.saveCart();
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  saveCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }
 
}
