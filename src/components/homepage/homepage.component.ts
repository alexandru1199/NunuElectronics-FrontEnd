import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProduseService } from '../produse/produse.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service'; // <== Import

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  Products: Product[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private produseService: ProduseService,
    private cartService: CartService,
    private loginService: LoginService // <== Inject
  ) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.produseService.getProducts().subscribe(
      (data: Product[]) => {
        this.Products = data.length > 6
          ? data.sort(() => 0.5 - Math.random()).slice(0, 6)
          : data;
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
