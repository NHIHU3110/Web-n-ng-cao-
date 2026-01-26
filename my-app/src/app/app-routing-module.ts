import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
import { Notfound } from './notfound/notfound';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { Ex13detail } from './ex13detail/ex13detail';
import { Ex13 } from './ex13/ex13';
import { FakeProduct } from './fake-product/fake-product';
import { Ex27 } from './ex27/ex27';
const routes: Routes = [
  { path: 'gioi-thieu', component: About },
  { path: 'khach-hang-1', component: Listcustomer },
  { path: 'khach-hang-2', component: Listcustomer2 },
  { path: 'khach-hang-3', component: Listcustomer3 },
  { path: 'san-pham-1', component: Listproduct },
  { path: 'san-pham-1/:id', component: Productdetail },
  { path: 'ex13/:id', component: Ex13detail },
  { path: '', redirectTo: 'ex13', pathMatch: 'full' },
  { path: 'ex26', component: FakeProduct },
  { path: 'ex27', component: Ex27 },
  { path: '**', component: Notfound }, // luôn để dòng cuối cùng 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
