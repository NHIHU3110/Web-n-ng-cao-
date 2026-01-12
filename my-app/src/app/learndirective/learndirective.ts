import { Component } from '@angular/core';

@Component({
  selector: 'app-learndirective',
  standalone: false,
  templateUrl: './learndirective.html',
  styleUrl: './learndirective.css',
})
export class Learndirective {
  flag_value:number=1
  changeView()
  {
    if(this.flag_value==1)
      this.flag_value=2
    else
    this.flag_value=1
  }
  products = ['Coca', 'Pepsi', 'Xá xị', 'mirinda', 'vị chanh ko calo'];
  customers = [
    { id: 'c1', name: 'Obama', phone: '113', img: 'asset/1.jpeg'},
    { id: 'c2', name: 'Biden', phone: '114', img: 'asset/2.webp' },
    { id: 'c3', name: 'Trump', phone: '115', img: 'asset/3.jpeg' }
  ];
  
}
