import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProduseService } from '../produse/produse.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  Products: Product[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private produseService: ProduseService,
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router // Injectăm Router pentru navigare
  ) {}

  ngOnInit(): void {
    // Abonarea la schimbarea statusului de logare
    this.loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Obținem produsele de la server
    this.produseService.getProducts().subscribe(
      (data: Product[]) => {
        this.Products = data.length > 6
          ? data.sort(() => 0.5 - Math.random()).slice(0, 6)  // Afișează doar 6 produse random
          : data;
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  goToProductDetail(productId: number | undefined): void {
    if (productId !== undefined) {  // Verificăm dacă id-ul produsului este definit
      this.router.navigate(['/product', productId]);
    } else {
      console.error('Product ID is undefined');
    }
  }
}