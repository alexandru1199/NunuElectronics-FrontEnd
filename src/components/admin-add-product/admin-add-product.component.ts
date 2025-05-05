import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduseService } from '../produse/produse.service';
import { Product } from '../../models/Product';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddProductComponent implements OnInit {
  isBrowser = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProduseService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  productForm = this.fb.group({
    productName: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/i)]],
    description: ['', Validators.required],
    detailedDescription: ['', Validators.required],
    tagId: [1, Validators.required]
  });

  ngOnInit(): void {
    console.log('✅ ngOnInit – suntem în browser:', this.isBrowser);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = {
        productName: this.productForm.value.productName || '',
        price: this.productForm.value.price || 0,
        stockQuantity: this.productForm.value.stockQuantity || 0,
        image: this.productForm.value.image || '',
        description: this.productForm.value.description || '',
        detailedDescription: this.productForm.value.detailedDescription || '',
        tagId: this.productForm.value.tagId || 1,
        createdDate: new Date()
      };

      this.productService.addProduct(product).subscribe({
        next: (response: any) => {
          if (this.isBrowser) {
            alert(response.message);
          }
          this.productForm.reset();
        },
        error: (err) => {
          if (this.isBrowser) {
            alert('Error adding product: ' + err.error);
          }
        }
      });
    } else {
      if (this.isBrowser) {
        alert('Please complete all fields and provide a valid image URL.');
      }
    }
  }
}
