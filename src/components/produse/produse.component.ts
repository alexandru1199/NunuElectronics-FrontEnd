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
  pagedProducts: Product[] = [];
  isLoggedIn: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(
    private produseService: ProduseService,
    private cartService: CartService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.produseService.getProducts().subscribe(
      (data: Product[]) => {
        this.Products = data;
        this.updatePagedProducts();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  updatePagedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedProducts = this.Products.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagedProducts();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.Products.length / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Produsul a fost adăugat în coș:', product);
    console.log(this.cartService.getCartItems());
  }
}
