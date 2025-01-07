import { Routes } from '@angular/router';
import { TemplateComponent } from '../components/template/template.component';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { ContactPageComponent } from '../components/contact-page/contact-page.component';
import { ProduseComponent } from '../components/produse/produse.component';


export const routes: Routes = [
    {path:'template',component:TemplateComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'contact',component:ContactPageComponent},
    {path:'',component:HomepageComponent},
    {path:'products',component:ProduseComponent},
    {path:'**',component:ErrorPageComponent},
    

];
