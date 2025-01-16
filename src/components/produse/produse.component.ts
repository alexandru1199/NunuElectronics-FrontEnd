import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product';
import { ProduseService } from './produse.service';

@Component({
  selector: 'app-produse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produse.component.html',
  styleUrl: './produse.component.scss'
})
export class ProduseComponent implements OnInit {
  Products: Product[] = []
  constructor(private produseService: ProduseService) { }

  ngOnInit(): void {
    const startTime = performance.now();
    this.produseService.getServices().subscribe(
      (data: any) => {  // Ensuring type safety
        this.Products.push(...data); // Assigning directly since it's already an array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );  
  }
}
