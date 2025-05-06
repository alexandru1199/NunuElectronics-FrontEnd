import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product';
import { ProduseService } from './produse.service';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-produse',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './produse.component.html',
  styleUrls: ['./produse.component.scss']
})
export class ProduseComponent implements OnInit {
  Products: Product[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private produseService: ProduseService,
    private cartService: CartService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Ascultăm statusul de autentificare
    this.loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Obținem produsele
    this.produseService.getProducts().subscribe(
      (data: Product[]) => {
        this.Products.push(...data);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Produsul a fost adăugat în coș:', product);
    console.log(this.cartService.getCartItems());
  }
}
