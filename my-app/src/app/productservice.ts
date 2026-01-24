import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Productservice {
  productsImage = [
    {"ProductId":"p1","ProductName":"Coca","Price":100,"Image":"https://dosi-in.com/images/detailed/500/dosiin-swe-ao-thun-nam-nu-swe-logos-tee-white-tay-ngan-thoi-trang-chinh-hang-500686500686.jpg"},
    {"ProductId":"p2","ProductName":"Pepsi","Price":300,"Image":"https://cdn.hstatic.net/products/200001108416/1__19__aa8e810b0ea3421799b73efcaf9e243b_efb5da8360a74e669fb004d94d7e730a_master.jpg"},
    {"ProductId":"p3","ProductName":"Sting","Price":200,"Image":"https://static.oreka.vn/800-800_ee11dee0-5ee2-4c75-b8d9-b0e60c72c291"},
  ];

  constructor() { }

  getProductsWithImages() {
    return this.productsImage;
  }

  getProductDetail(id: any) {
    return this.productsImage.find(x => x.ProductId == id);
  }
}