import { Routes } from '@angular/router';
import { FashionListComponent } from './fashion-list/fashion-list';
import { FashionDetailComponent } from './fashion-detail/fashion-detail';

export const routes: Routes = [
  { path: '', component: FashionListComponent },
  { path: 'fashions/:id', component: FashionDetailComponent },
  { path: '**', redirectTo: '' }
];
