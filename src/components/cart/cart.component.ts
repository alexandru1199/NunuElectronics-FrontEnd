import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs'; // ✅
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  private sub!: Subscription;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe(); // 🔁 curățăm când componenta dispare
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getTotal(): string {
    const total = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total.toFixed(2);
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity += 1;
    this.cartService.saveCart(); // 👈 actualizezi localStorage și emiți
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.cartService.saveCart(); // 👈 la fel și aici
    }
  }

  onCheckout(): void {
    this.router.navigate(['/orderdetails']);
  }
}
