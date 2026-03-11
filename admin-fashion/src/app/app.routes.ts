import { Routes } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list';
import { AdminFormComponent } from './admin-form/admin-form';

export const routes: Routes = [
  { path: '', component: AdminListComponent },
  { path: 'fashions/new', component: AdminFormComponent },
  { path: 'fashions/edit/:id', component: AdminFormComponent },
  { path: '**', redirectTo: '' }
];
