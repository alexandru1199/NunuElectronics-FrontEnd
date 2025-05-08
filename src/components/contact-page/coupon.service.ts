import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../../constants';
import { CouponCreate } from '../../models/CouponCreate';

// Definirea unui tip pentru răspunsul de la API
interface CouponResponse {
  message: string;
  discount: number;  // Asigură-te că includem discount-ul în răspuns
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class CouponService {
  private baseUrl = `${APP_CONSTANTS.BACKEND_BASE_URL_PROD}/api/Coupons`;

  constructor(private http: HttpClient) {}

  // Funcția pentru creare cupon
  createCoupon(dto: CouponCreate): Observable<any> {
    return this.http.post(`${this.baseUrl}`, dto);
  }

  // Funcția pentru a obține cupoanele utilizatorului
  getCouponsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  // Funcția pentru a marca cuponul ca folosit
  useCoupon(userId: number, couponCode: string): Observable<CouponResponse> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('couponCode', couponCode);

    // Ajustează URL-ul pentru a face un PUT corect, și trimite o cerere goală ({} este pentru body-ul cererii)
    return this.http.put<CouponResponse>(`${this.baseUrl}/use`, {}, { params });
  }
}
