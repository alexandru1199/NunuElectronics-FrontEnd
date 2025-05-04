import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONSTANTS } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userUrl = APP_CONSTANTS.BACKEND_BASE_URL_PROD + '/api/users';
  
  // Cream un BehaviorSubject pentru a emite imaginea actualizată
  private profileImageSubject = new BehaviorSubject<string | null>(null);
  profileImage$ = this.profileImageSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obține imaginea de profil
  getProfileImage(userId: number): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/${userId}/profile-image`);
  }

  // Actualizează imaginea de profil
  updateProfileImage(userId: number, imageBase64: string): Observable<any> {
    // Emiterea imaginii noi imediat, înainte de a face request-ul
    this.profileImageSubject.next(imageBase64);
  
    const dto = { userId, imageBase64 };
    return this.http.post<any>(`${this.userUrl}/profile-image`, dto);
  }
  

  // Emită noua imagine de profil


  // Obține istoricul comenzilor
  getOrderHistory(userId: number): Observable<any[]> {
    const orderUrl = APP_CONSTANTS.BACKEND_BASE_URL_PROD + '/api/orders/user/' + userId;
    return this.http.get<any[]>(orderUrl);
  }
}
