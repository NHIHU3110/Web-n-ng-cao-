import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Learnbiding } from './learnbiding/learnbiding';
import { Ptb1 } from './ptb1/ptb1';
import { FormsModule } from '@angular/forms';
import { Ptb2 } from './ptb2/ptb2';
import { Learndirective } from './learndirective/learndirective';
import { LunarYear } from './lunar-year/lunar-year';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Customerdetail } from './customerdetail/customerdetail';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
import { HttpClientModule } from '@angular/common/http';
import { Ex14 } from './ex14/ex14';
import { Notfound } from './notfound/notfound';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { Ex13 } from './ex13/ex13';
import { Ex13detail } from './ex13detail/ex13detail';
import { CommonModule } from '@angular/common';
import { FakeProduct } from './fake-product/fake-product';
import { Ex27 } from './ex27/ex27';
import { Ex18 } from './ex18/ex18';

@NgModule({
  declarations: [
    App,
    About,
    Contact,
    Learnbiding,
    Ptb1,
    Ptb2,
    Learndirective,
    LunarYear,
    Listcustomer,
    Listcustomer2,
    Customerdetail,
    Listcustomer3,
    Ex14,
    Notfound,
    Listproduct,
    Productdetail,
    Ex13,
    Ex13detail,
    FakeProduct,
    Ex27,
    Ex18,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
