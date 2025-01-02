import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produse.component.html',
  styleUrl: './produse.component.scss'
})
export class ProduseComponent {
  Products: Product[] = [
    {
      productId: 1,
      productName: "Laptop",
      price: 1299.99,
      stockQuantity: 25,
      createdDate: new Date("2023-01-15")
    },
    {
      productId: 2,
      productName: "Smartphone",
      price: 799.49,
      stockQuantity: 50,
      createdDate: new Date("2023-05-10")
    },
    {
      productId: 3,
      productName: "Headphones",
      price: 199.99,
      stockQuantity: 100,
      createdDate: new Date("2024-03-22")
    },
    {
      productId: 4,
      productName: "Keyboard",
      price: 49.99,
      stockQuantity: 150,
      createdDate: new Date("2022-11-11")
    },
    {
      productId: 5,
      productName: "Gaming Chair",
      price: 299.95,
      stockQuantity: 10,
      createdDate: new Date("2023-07-18")
    }
  ];
}
