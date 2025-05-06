import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailPayload } from '../../models/email-payload.model';
import { APP_CONSTANTS } from '../../constants';

@Injectable({ providedIn: 'root' })
export class EmailService {

  private apiUrl = APP_CONSTANTS.BACKEND_BASE_URL_PROD + '/api/Email/send';
  constructor(private http: HttpClient) {}

  sendEmail(payload: EmailPayload) {
    return this.http.post(this.apiUrl, payload);
  }
}