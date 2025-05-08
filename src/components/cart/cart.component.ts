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
  discountPercentage: number = 0;  // Procentajul discount-ului
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
  applyCoupon(): void {
    if (this.userId && this.couponCode) {
      this.couponService.useCoupon(this.userId, this.couponCode).subscribe(
        (response) => {
          console.log('Coupon applied successfully:', response);
          this.discountPercentage = response.discount || 0;
          
          const total = parseFloat(this.getTotal());
          // Calculăm discount-ul ca un număr
          this.discountAmount = (total * this.discountPercentage) / 100;
          alert('Cupon aplicat cu succes!');
          this.couponApplied = true;
        },
        (error) => {  
          console.log('Error applying coupon:', error.error.error);
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
  
  
  

  // Calculăm totalul cu discount aplicat pe bază de procentaj
  getTotalWithDiscount(): string {
    const total = parseFloat(this.getTotal());
    const discountedTotal = total - this.discountAmount;  // Folosim discountAmount ca un număr
    return discountedTotal.toFixed(2);  // Afișăm rezultatul rotunjit la 2 zecimale
  }
}
