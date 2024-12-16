import { Routes } from '@angular/router';
import { TemplateComponent } from '../components/template/template.component';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { NavbarComponent } from '../components/navbar/navbar.component';


export const routes: Routes = [
    {path:'template',component:TemplateComponent},
    {path:'navbar',component:NavbarComponent},
    {path:'',component:HomepageComponent},
    

];
