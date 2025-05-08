import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs'; 
import { Router } from '@angular/router';
import { CouponService } from '../contact-page/coupon.service';
import { TokenService } from '../profile/tokenservice';
import { FormsModule } from '@angular/forms';  // Importă FormsModule

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  private sub!: Subscription;
  couponCode: string = '';  // Adaugă un câmp pentru codul de cupon
  userId: number | null = null;  // User ID
  errorMessage: string | null = null; // Adaugă un câmp pentru mesajele de eroare
  couponApplied: boolean = false;  // Flag pentru a urmări dacă cuponul a fost aplicat
  discountAmount: number = 0;  // Suma economisită

  constructor(
    private cartService: CartService,
    private couponService: CouponService,  // Injectează serviciul pentru cupoane
    private tokenService: TokenService,  // Injectează serviciul Token
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();  // Obține userId din token
    this.sub = this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
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
    this.cartService.saveCart();
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.cartService.saveCart();
    }
  }

  onCheckout(): void {
    this.router.navigate(['/orderdetails']);
  }

  // Metodă pentru aplicarea unui cupon
  applyCoupon(): void {
    if (this.userId && this.couponCode) {
      this.couponService.useCoupon(this.userId, this.couponCode).subscribe(
        (response) => {
          console.log('Coupon applied successfully:', response);
          // Calculăm suma economisită, presupunând că răspunsul include un câmp 'discount'
          this.discountAmount = response.discount || 0;
          alert('Cupon aplicat cu succes!');
          this.couponApplied = true;  // Marchez cuponul ca aplicat
  
          // Actualizează totalul cu discount-ul aplicat
          const total = this.getTotal();
          const discountedTotal = parseFloat(total) - this.discountAmount;
          console.log('Total cu discount aplicat: ', discountedTotal.toFixed(2));
        },
        (error) => {  
          console.log('Error applying coupon:', error.error.error);
          // Verifică dacă eroarea este legată de cuponul care nu a fost găsit sau deja utilizat
          if (error.error.error === 'Coupon not found or already used.') {
            alert('Cuponul nu a fost găsit sau a fost deja utilizat.');
          } else {
            alert('A apărut o eroare la aplicarea cuponului.');
          }
        }
      );
    } else {
      alert('Completează toate câmpurile corect.');
    }
  }
  getTotalWithDiscount(): string {
    const total = parseFloat(this.getTotal());
    const discountedTotal = total - this.discountAmount;
    return discountedTotal.toFixed(2);
  }
  
}
