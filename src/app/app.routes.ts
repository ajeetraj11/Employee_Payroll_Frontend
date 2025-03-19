import { Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { EditPageComponent } from './page/edit-page/edit-page.component';
import { AddComponent } from './page/add-page/add-page.component';

export const routes: Routes = [
    {
        path:"",component:DashboardComponent
    },
    {
        path:"editpage/:id",component:EditPageComponent
    },
    {
        path:'add',component:AddComponent
    }
    
];
