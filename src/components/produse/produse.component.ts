import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product';
import { ProduseService } from './produse.service';

import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-produse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produse.component.html',
  styleUrls: ['./produse.component.scss']
})
export class ProduseComponent implements OnInit {
  Products: Product[] = [];

  constructor(
    private produseService: ProduseService,
    private cartService: CartService // Injectează serviciul CartService
  ) { }

  ngOnInit(): void {
    const startTime = performance.now();
    this.produseService.getServices().subscribe(
      (data: any) => {
        this.Products.push(...data);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: Product) {
    // Folosește serviciul CartService pentru a adăuga produsul în coș
    this.cartService.addToCart(product);
    console.log('Produsul a fost adăugat în coș:', product);
    console.log(this.cartService.getCartItems())
  }
}
