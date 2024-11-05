import { Component, OnInit } from '@angular/core';
import { TemplateService } from './template.service';
import { Template } from '../../models/Template';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TemplateComponent implements OnInit {
  templates: Template[] = []; // Still using an array for consistency

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.templateService.getTemplates().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.templates.push(...data);  // If it's already an array
        }
        // asta e doar de test, api-urile care o sa le facem o sa trimitem arrayuri
        else if (data && typeof data === 'object' && !Array.isArray(data)) {
          this.templates.push(data);  // Add the single object to the array
        }  else {
          console.error('Unexpected data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching templates:', error);
      }
    );
  }
}
