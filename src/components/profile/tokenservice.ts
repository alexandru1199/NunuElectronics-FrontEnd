import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const claims = JSON.parse(atob(token.split('.')[1]));
      const id = claims['nameid'] || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return id ? parseInt(id) : null;
    } catch {
      return null;
    }
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const claims = JSON.parse(atob(token.split('.')[1]));
      return claims['name'] || claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
    } catch {
      return null;
    }
  }

  getUserRole(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const claims = JSON.parse(atob(token.split('.')[1]));
      const role = claims['role'] || claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role ? parseInt(role) : null;
    } catch {
      return null;
    }
  }
}