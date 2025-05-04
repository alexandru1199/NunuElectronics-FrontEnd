import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CartService } from '../cart/cart.service'; 
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  isLoggedIn: boolean = false;
  profileImage: string | null = null; // Imaginea de profil
  private sub!: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cartService: CartService,
    private loginService: LoginService,
    private profileService: ProfileService // Injectăm ProfileService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Verificăm dacă aplicația este rulată în browser și putem accesa localStorage
      this.initializeCart();
      this.initializeLoginStatus();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private initializeCart(): void {
    this.sub = this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + (item.quantity || 0), 0);
    });
  }

  private initializeLoginStatus(): void {
    this.loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;

      if (status) {
        const userId = this.getUserIdFromToken();
        if (userId) {
          // Obținem imaginea de profil din backend
          this.profileService.getProfileImage(userId).subscribe({
            next: (response) => {
              this.profileImage = response?.imageBase64 || null;
            },
            error: err => console.error('Eroare la încărcarea imaginii de profil:', err)
          });
        }
      } else {
        this.profileImage = null; // Dacă utilizatorul nu este logat, imaginea devine null
      }
    });

    // Abonăm la schimbările imaginii de profil (pentru a actualiza când se schimbă imaginea)
    this.profileService.profileImage$.subscribe(image => {
      this.profileImage = image;
    });
  }

  // Funcție pentru a extrage userId din token, similar cu ce ai avut anterior
  getUserIdFromToken(): number {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) return 0;

      try {
        const payloadEncoded = token.split('.')[1];
        const decodedPayload = atob(payloadEncoded);
        const claims = JSON.parse(decodedPayload);

        const nameId = claims['nameid'] || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        return nameId ? parseInt(nameId) : 0;
      } catch (err) {
        console.error('Eroare la decodificarea token-ului', err);
        return 0;
      }
    }
    return 0; // Dacă nu suntem pe browser, returnăm 0
  }
}
