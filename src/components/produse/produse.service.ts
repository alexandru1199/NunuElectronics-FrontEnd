import { HttpClient } from '@angular/common/http';
import { Template } from '../../models/Template';
import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../../constants';
import { Product } from '../../models/Product';
@Injectable({
    providedIn: 'root'
  })
export class ProduseService {
    constructor(private http: HttpClient) { }
    produseUrl = APP_CONSTANTS.BACKEND_BASE_URL+"/Product";
    getServices(){
        return this.http.get<Product[]>(this.produseUrl);
    }
}

