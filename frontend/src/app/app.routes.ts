import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list.component';
import { LoginComponent } from './components/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];