import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
    {path:'userlist',component:UserListComponent, title:'User List'},
    {path:'', redirectTo:'userlist', pathMatch:'full'},
];
