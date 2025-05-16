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

  // Obține toate produsele
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.produseUrl);
  }

  // Adaugă un produs nou
  addProduct(product: Product): Observable<any> {
    return this.http.post(this.produseUrl, product);
  }

  // Obține un produs după ID
  getProductById(id: number): Observable<Product> {
    const url = `${this.produseUrl}/${id}`; // Construieste URL-ul cu ID-ul produsului
    return this.http.get<Product>(url); // Returnează un observable cu produsul
  }
  getProductsByTagId(tagId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.produseUrl}/tag/${tagId}`);
  }
}
