import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.scss'
})
export class OrderDetailsComponent {
  orderForm = this.fb.group({
    ShippingAddress: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private cartService: CartService
  ) {}

  onSubmit(): void {
    if (this.orderForm.valid) {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        console.error('Invalid user ID from token.');
        return;
      }

      const products = this.getProductsFromCart();

      const payload = {
        userId,
        products,
        ShippingAddress: this.orderForm.value.ShippingAddress
      };

      this.orderService.createOrder(payload).subscribe({
        next: () => {
          this.cartService.clearCart();
          this.router.navigate(['/thankyou']);
        },
        error: (err) => console.error('Order error', err)
      });
    }
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token');
    if (!token) return 0;

    try {
      const payloadEncoded = token.split('.')[1];
      const decodedPayload = atob(payloadEncoded);
      const claims = JSON.parse(decodedPayload);

      // Poate fi una dintre cele două chei, în funcție de cum e generat token-ul
      const nameId = claims['nameid'] || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      return nameId ? parseInt(nameId) : 0;
    } catch (err) {
      console.error('Invalid JWT token', err);
      return 0;
    }
  }

  getProductsFromCart(): { productId: number; quantity: number }[] {
    return this.cartService.getCartItems();
  }
}
