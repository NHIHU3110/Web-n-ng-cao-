import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Catalogservice {
  
  datas = [
    {
      Cateid: 'cate1',
      CateName: 'nuoc ngot',
      Products: [
        { ProductId: 'p1', ProductName: 'Coca', Price: 100, Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGK6uQO-rAodRRmhYvkX3AxL5xQDkW_7ic_w&s' },
        { ProductId: 'p2', ProductName: 'Pepsi', Price: 300, Image: 'https://rgb.vn/wp-content/uploads/2025/07/rgb-brand-news-pepsi-prebiotic-cola-cv.jpg' },
        { ProductId: 'p3', ProductName: 'Sting', Price: 200, Image: 'https://cdn2.tuoitre.vn/thumb_w/1200/tto/i/s626/2016/11/14/sting-1479135293.jpg' },
      ],
    },
    {
      Cateid: 'cate2',
      CateName: 'Bia',
      Products: [
        { ProductId: 'p4', ProductName: 'Heneiken', Price: 500, Image: 'https://bianhagau.vn/wp-content/uploads/2025/11/Bia-Heineken-Chai-750ml-min.jpg' },
        { ProductId: 'p5', ProductName: '333', Price: 400, Image: 'https://cdn-merchant.vinid.net/images/gallery/vinshop-seo/image_upload_1736919565_2.png' },
        { ProductId: 'p6', ProductName: 'Sai Gon', Price: 600, Image: 'https://www.sabeco.com.vn/Data/Sites/1/media/thuong-hieu/saigon-chill/bsg-chill-sku_635x515px-new.png' },
      ],
    },
  ];

  constructor() {}

  getCategories() {
    return this.datas;
  }
}
