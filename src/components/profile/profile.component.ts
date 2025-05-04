import { Component, HostListener, Inject, PLATFORM_ID, OnInit, Renderer2 } from '@angular/core';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common'; // Importă isPlatformBrowser
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router'; // Importă Router

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  imageBase64: string | null = null;
  username: string | null = null; // Folosim username în loc de userId
  userId: number | null = null; // Adăugăm userId pentru cazul în care backend-ul cere un ID numeric
  orderHistory: any[] = [];

  constructor(
    private profileService: ProfileService, 
    private loginService: LoginService,  // Adaugă LoginService aici
    private router: Router,  // Adaugă Router aici
    private renderer: Renderer2, // Injectează Renderer2
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.username = this.getUsernameFromToken(); // Obține username din token
    this.userId = this.getUserIdFromToken(); // Obține userId din token, dacă este necesar

    if (this.username && this.userId) {
      // Folosește username în loc de userId pentru a obține imaginea de profil
      this.profileService.getProfileImage(this.userId).subscribe({
        next: (image: any) => {
          if (image && image.imageBase64) {
            this.imageBase64 = image.imageBase64;
          }
        },
        error: err => console.error('Eroare la încărcarea imaginii de profil:', err)
      });

      // Folosește username în loc de userId pentru a obține istoricul comenzilor
      this.profileService.getOrderHistory(this.userId).subscribe({
        next: (orders: any[]) => {
          this.orderHistory = orders;
        },
        error: err => console.error('Eroare la încărcarea istoricului comenzilor:', err)
      });
    }
  }

  // Verificăm dacă aplicația rulează pe browser
  getUsernameFromToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null; // Sau returnează o valoare implicită în cazul SSR
    }

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payloadEncoded = token.split('.')[1];
      const decodedPayload = atob(payloadEncoded);
      const claims = JSON.parse(decodedPayload);

      const username = claims['name'] || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']; // Căutăm username
      return username ? username : null;
    } catch (err) {
      console.error('Eroare la decodificarea token-ului', err);
      return null;
    }
  }

  getUserIdFromToken(): number | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payloadEncoded = token.split('.')[1];
      const decodedPayload = atob(payloadEncoded);
      const claims = JSON.parse(decodedPayload);

      const userId = claims['nameid'] || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return userId ? parseInt(userId) : null;
    } catch (err) {
      console.error('Eroare la decodificarea token-ului', err);
      return null;
    }
  }

  // Folosim Renderer2 pentru a simula un click pe input-ul de fișiere
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.imageBase64 = base64;

        // Trimite imaginea la backend folosind userId pentru că backend-ul cere un ID numeric
        if (this.userId) {
          this.profileService.updateProfileImage(this.userId, base64).subscribe({
            next: () => alert('Imaginea a fost actualizată!'),
            error: err => console.error('Eroare la upload:', err)
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Metoda pentru a deschide selectorul de fișiere
  triggerFileInput() {
    const fileInput = document.querySelector('.file-input') as HTMLInputElement;
    if (fileInput) {
      this.renderer.selectRootElement(fileInput).click(); // Folosim Renderer2 pentru a simula un click
    }
  }

  logout(): void {
    // Șterge token-ul din localStorage
    localStorage.removeItem('token');

    // Actualizează starea de autentificare
    this.loginService.setLoginStatus(false);

    // Redirecționează utilizatorul către pagina de login
    this.router.navigate(['/login']);
  }
}
