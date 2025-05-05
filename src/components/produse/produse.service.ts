import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../../constants';
import { Product } from '../../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduseService {
  constructor(private http: HttpClient) {}

  private produseUrl = APP_CONSTANTS.BACKEND_BASE_URL_PROD + '/Product';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.produseUrl);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.produseUrl, product);
  }
}
