// src/components/admin-add-product/admin-add-product.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduseService } from '../produse/produse.service';
import { Product } from '../../models/Product';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TagService } from './tag.service';
import { Tag } from '../../models/Tag';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddProductComponent implements OnInit {
  isBrowser = false;
  tags: Tag[] = []; // Variabilă pentru lista de taguri

  constructor(
    private fb: FormBuilder,
    private productService: ProduseService,
    private tagService: TagService, // Injectăm TagService
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  productForm = this.fb.group({
    productName: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    image: ['', [Validators.required]],
    description: ['', Validators.required],
    detailedDescription: ['', Validators.required],
    tagId: [null as number | null, Validators.required]  // Modifică aici
  });
  
  ngOnInit(): void {
    // Obținem tagurile din TagService la inițializare
    this.tagService.getTags().subscribe({
      next: (tags: Tag[]) => {
        this.tags = tags; // Salvăm tagurile în variabila locală
        console.log('✅ Tags loaded:', this.tags);
  
        // Verificăm dacă există cel puțin un tag înainte de a seta valoarea
        if (this.tags && this.tags.length > 0) {
          this.productForm.patchValue({ tagId: this.tags[0].tagID });  // tagID este un number
        }
      },
      error: (err) => {
        if (this.isBrowser) {
          alert('Error loading tags: ' + err.error);
        }
      }
    });
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
        tagId: this.productForm.value.tagId || 0,  // Acum trimitem numărul tagId
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
