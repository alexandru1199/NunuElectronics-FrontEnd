import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailPayload } from '../../models/email-payload.model';
import { APP_CONSTANTS } from '../../constants';
import { Tag } from '../../models/Tag';

@Injectable({ providedIn: 'root' })
export class TagService {

  private apiUrl = APP_CONSTANTS.BACKEND_BASE_URL_PROD + '/api/tag';
  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }
}