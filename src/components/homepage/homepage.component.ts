import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProduseService } from '../produse/produse.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent  implements OnInit{
Products: Product[] = []
  constructor(private produseService: ProduseService) { }
  ngOnInit(): void {
    this.produseService.getServices().subscribe(
      (data: Product[]) => { 
        if (data.length > 2) {
          this.Products = data.sort(() => 0.5 - Math.random()).slice(0, 2);
        } else {
          this.Products = data; // Dacă sunt mai puțin de 2 produse, le ia pe toate
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
}

