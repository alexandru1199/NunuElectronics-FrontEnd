import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateComponent } from '../components/template/template.component';
import { ContactPageComponent } from '../components/contact-page/contact-page.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TemplateComponent, ContactPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Nunu-Electronics';
}
