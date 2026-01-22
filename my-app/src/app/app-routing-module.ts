import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
import { Notfound } from './notfound/notfound';

const routes: Routes = [
  { path: 'gioi-thieu', component: About },
  {path:'khach-hang-1', component: Listcustomer},
  {path:'khach-hang-2', component: Listcustomer2},
  {path:'khach-hang-3', component: Listcustomer3},
  { path: '**', component: Notfound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
