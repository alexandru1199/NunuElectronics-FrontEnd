import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProduseService } from '../produse/produse.service';
import { Product } from '../../models/Product';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';  // Importă serviciul Login
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  recommendedProducts: Product[] = [];
  isLoggedIn: boolean = false;  // Variabila pentru a verifica logarea

  constructor(
    private route: ActivatedRoute,
    private produseService: ProduseService,
    private cartService: CartService,
    private loginService: LoginService  // Adaugă serviciul Login
  ) {}

  ngOnInit(): void {
    // Verificăm dacă utilizatorul este logat
    this.loginService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.produseService.getProductById(+productId).subscribe(
        (data: Product) => {
          this.product = data;
          if (this.product && this.product.tagId) {
            this.getRecommendedProducts(this.product.tagId); // Obține produsele recomandate
          }
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  getRecommendedProducts(tagId: number): void {
    this.produseService.getProductsByTagId(tagId).subscribe(
      (data: Product[]) => {
        this.recommendedProducts = data.filter(
          (prod) => prod.productID !== this.product?.productID // Exclude produsul curent
        );
      },
      (error) => {
        console.error('Error fetching recommended products:', error);
      }
    );
  }

  addToCart(product: Product) {
    if (this.isLoggedIn) {
      this.cartService.addToCart(product);
      console.log('Produsul a fost adăugat în coș:', product);
      console.log(this.cartService.getCartItems());
    } else {
      console.log('Trebuie să te loghezi pentru a adăuga produse în coș');
    }
  }
}
