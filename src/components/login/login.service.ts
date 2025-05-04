import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { APP_CONSTANTS } from '../../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = APP_CONSTANTS.BACKEND_BASE_URL_PROD + "/Auth/login";
  private loggedIn: BehaviorSubject<boolean>;

  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    const isBrowser = isPlatformBrowser(this.platformId);
    const initialStatus = isBrowser ? !!localStorage.getItem('token') : false;

    this.loggedIn = new BehaviorSubject<boolean>(initialStatus);
    this.isLoggedIn$ = this.loggedIn.asObservable();
  }

  login(credentials: { UserName: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginUrl, credentials);
  }

  setLoginStatus(status: boolean): void {
    this.loggedIn.next(status);
  }
}
