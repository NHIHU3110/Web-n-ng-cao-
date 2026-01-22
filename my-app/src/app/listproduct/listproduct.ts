import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listproduct',
  standalone: false,
  templateUrl: './listproduct.html',
  styleUrl: './listproduct.css',
})
export class Listproduct {
  products=[{"id":"p1","name":"Labubu","price":"-600k","image":"https://cdn2.tuoitre.vn/471584752817336320/2024/8/20/8-1724143868809936335412.jpg"},
    {"id":"p2","name":"Skullpanda","price":"280k","image":"https://m.media-amazon.com/images/I/61fWtY-aFjL._AC_UF350,350_QL80_.jpg"},
    {"id":"p3","name":"Hirono","price":"600k","image":"https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-lqalk464elo594"},
    {"id":"p4","name":"Dimoo","price":"600k","image":"https://prod-america-res.popmart.com/default/20250704_181402_814795____6_dimoo-jurassic-world-series_blind-boxes_details_popmart-us_____1200x1200.jpg?x-oss-process=image/format,webp"},
    {"id":"p5","name":"Baby three","price":"-15k","image":"https://sieuthidaisymart.com/wp-content/uploads/2024/12/blindbox-tui-mu-Baby-Three-400-8.jpg"},
    

  ]
  selective_id:any
  constructor(private router: Router, private activeRouter:ActivatedRoute)
  {
    //dùng router để diều hướng
    //dùng active router để nhận điều hướng
    activeRouter.paramMap.subscribe((param)=>{
      this.selective_id=param.get('id')
    })
  }
  view_detail(pid:string)
  {
    //alert('thong tin chi tiet san pham co ID='+pid)
    this.router.navigate(["san-pham-1",pid])
  }

}
