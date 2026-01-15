import { Component } from '@angular/core';

@Component({
  selector: 'app-listcustomer',
  standalone: false,
  templateUrl: './listcustomer.html',
  styleUrl: './listcustomer.css',
})
export class Listcustomer {
  customers = [
    { "id": "c1", "name": "Putin", "age": "72", "image": "https://cdn2.tuoitre.vn/thumb_w/480/471584752817336320/2025/5/6/tong-thong-putin-1746493357873526779241.jpeg"},
    { "id": "c2", "name": "Trump", "age": "78", "image": "https://photo.znews.vn/w660/Uploaded/rotntv/2026_01_09/Following_his_return_to_the_White_House_US_President_Donald_Trump_has_sharply_cut_foreign_funding_to_prioritise_his_America_first_agenda._Reuters.jpg"},
    { "id": "c3", "name": "Kim", "age": "70", "image": "https://media.la34.com.vn/upload/image/201803/medium/30903_kimjongun.jpg"},
    { "id": "c4", "name": "Tập", "age": "38", "image": "https://cdn.tienphong.vn/images/a6bf4f60924201126af6849ca45a39805b544e13c01425dadd09613029fc24c97c5eeb63edb228d2a81fe37243fecbcd46e202956aa0c110deb29a05882b47ff/tap-can-binh-474.png"},
  ];
}

