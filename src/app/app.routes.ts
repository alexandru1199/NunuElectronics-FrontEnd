import { Routes } from '@angular/router';
import { TemplateComponent } from '../components/template/template.component';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { ContactPageComponent } from '../components/contact-page/contact-page.component';


export const routes: Routes = [
    {path:'template',component:TemplateComponent},
    {path:'navbar',component:NavbarComponent},
<<<<<<< HEAD
    {path:'contact'}
=======
    {path:'contact',component:ContactPageComponent},
>>>>>>> Cristi_1
    {path:'',component:HomepageComponent},
    {path:'**',component:ErrorPageComponent},
    

];
