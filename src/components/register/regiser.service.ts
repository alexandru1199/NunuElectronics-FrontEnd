import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = APP_CONSTANTS.BACKEND_BASE_URL_PROD + "/Auth/register";

  constructor(private http: HttpClient) {}

  register(credentials: { UserName: string; password: string,roleId:number }): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.registerUrl, credentials);
  }
}
