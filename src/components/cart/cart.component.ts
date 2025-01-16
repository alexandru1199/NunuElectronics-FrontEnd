import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router
@Component({
  selector: 'app-cart',
  imports:[CommonModule],
  standalone:true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal(): string {
    const total = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total.toFixed(2);
  }

  // Crește cantitatea produsului
  increaseQuantity(index: number): void {
    this.cartItems[index].quantity += 1;
  }

  // Scade cantitatea produsului
  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    }
  }
  onCheckout(): void {
    // Optional: Add logic to handle order placement here (e.g., save order to the server)
    // After handling checkout, navigate to the Thank You page
    this.cartService.clearCart(); // Această metodă se ocupă și de Local Storage
    this.router.navigate(['/thankyou']);
  }
}
