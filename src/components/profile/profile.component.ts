import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ProfileService } from './profile.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginService } from '../login/login.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProfileComponent implements OnInit {
  imageBase64: string | null = null;
  username: string | null = null;
  userId: number | null = null;
  userRole: number | null = null;
  orderHistory: any[] = [];

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.username = this.getUsernameFromToken();
    this.userId = this.getUserIdFromToken();
    this.userRole = this.getUserRoleFromToken();

    if (this.username && this.userId) {
      this.profileService.getProfileImage(this.userId).subscribe({
        next: (image: any) => {
          if (image?.imageBase64) {
            this.imageBase64 = image.imageBase64;
          }
        },
        error: err => console.error('Eroare la încărcarea imaginii de profil:', err)
      });

      this.profileService.getOrderHistory(this.userId).subscribe({
        next: (orders: any[]) => {
          this.orderHistory = orders;
        },
        error: err => console.error('Eroare la încărcarea istoricului comenzilor:', err)
      });
    }
  }

  getUsernameFromToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const claims = JSON.parse(atob(token.split('.')[1]));
      return claims['name'] || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
    } catch (err) {
      console.error('Eroare la decodificarea token-ului', err);
      return null;
    }
  }

  getUserIdFromToken(): number | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const claims = JSON.parse(atob(token.split('.')[1]));
      const id = claims['nameid'] || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return id ? parseInt(id) : null;
    } catch (err) {
      console.error('Eroare la decodificarea token-ului', err);
      return null;
    }
  }

  getUserRoleFromToken(): number | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const claims = JSON.parse(atob(token.split('.')[1]));
      const role = claims['role'] || claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role ? parseInt(role) : null;
    } catch (err) {
      console.error('Eroare la extragerea rolului din token:', err);
      return null;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.imageBase64 = base64;

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

  triggerFileInput() {
    const fileInput = document.querySelector('.file-input') as HTMLInputElement;
    if (fileInput) {
      this.renderer.selectRootElement(fileInput).click();
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loginService.setLoginStatus(false);
    this.router.navigate(['/login']);
  }
}
