import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = APP_CONSTANTS.BACKEND_BASE_URL_PROD + '/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(orderData: any) {
    return this.http.post(this.orderUrl, orderData);
  }
}
