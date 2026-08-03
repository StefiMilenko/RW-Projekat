import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list.component';
import { LoginComponent } from './components/login.component';
import { PlayerListComponent } from './components/player-list.component';
import { InventoryListComponent } from './components/inventory-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'inventory', component: InventoryListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];