import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TemplateComponent } from '../components/template/template.component';
<<<<<<< HEAD
import { HomepageComponent } from '../components/homepage/homepage.component';
import { NavbarComponent } from "../components/navbar/navbar.component";
=======
import { ContactPageComponent } from '../components/contact-page/contact-page.component';
>>>>>>> 7950368 (yes)



@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [ TemplateComponent, HomepageComponent, NavbarComponent,RouterOutlet, RouterLink, RouterLinkActive],
=======
  imports: [RouterOutlet,TemplateComponent, ContactPageComponent],
>>>>>>> 7950368 (yes)
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Nunu-Electronics';
}