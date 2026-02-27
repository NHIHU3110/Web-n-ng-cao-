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
import { Ex18 } from './ex18/ex18';
import { Ex19Product } from './ex19-product/ex19-product';
import { Ex19ListProduct } from './ex19-list-product/ex19-list-product';
import { Ex19ServiceProduct } from './ex19-service-product/ex19-service-product';
import { Ex21Login } from './ex21-login/ex21-login';
import { Ex22Course } from './ex22-course/ex22-course';
import { Ex24Math } from './ex24-math/ex24-math';
import { Ex28Bitcoin } from './ex28-bitcoin/ex28-bitcoin';
import { Books } from './books/books';
import { BookDetail } from './book-detail/book-detail';
import { BookNewComponent } from './book-new/book-new.component';
import { Ex50Component } from './ex50/ex50.component';
import { FashionComponent } from './fashion/fashion';
const routes: Routes = [
  { path: 'gioi-thieu', component: About },
  { path: 'khach-hang-1', component: Listcustomer },
  { path: 'khach-hang-2', component: Listcustomer2 },
  { path: 'khach-hang-3', component: Listcustomer3 },
  { path: 'san-pham-1', component: Listproduct },
  { path: 'san-pham-1/:id', component: Productdetail },
  { path: 'ex13/:id', component: Ex13detail },
  { path: 'ex26', component: FakeProduct },
  { path: 'ex27', component: Ex27 },
  { path: 'ex19-product', component: Ex19Product },
  { path: 'ex19-list-product', component: Ex19ListProduct },
  { path: 'ex19-service-product', component: Ex19ServiceProduct },
  { path: 'ex18', component: Ex18 },
  { path: 'ex21-login', component: Ex21Login },
  { path: 'ex22-course', component: Ex22Course },
  { path: 'ex24-math', component: Ex24Math },
  { path: 'ex28-bitcoin', component: Ex28Bitcoin },
  { path: '', redirectTo: 'ex21-login', pathMatch: 'full' },
  { path: 'ex39', component: Books },
  { path: 'ex41', component: BookDetail },
  { path: 'ex41/:id', component: BookDetail },
  { path: 'ex43', component: BookNewComponent },
  { path: 'ex43/:id', component: BookNewComponent },
  { path: 'ex50', component: Ex50Component },
  { path: 'fashions', component: FashionComponent },
  { path: '**', component: Notfound }, // luôn để dòng cuối cùng

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
