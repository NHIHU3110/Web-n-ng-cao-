import { Component } from '@angular/core';
import { Catalogservice } from '../catalogservice';

@Component({
  selector: 'app-ex14',
  standalone: false,
  templateUrl: './ex14.html',
  styleUrl: './ex14.css',
})
export class Ex14 {
  categories: any[] = [];

  constructor(private catalogService: Catalogservice) {}

  ngOnInit(): void {
    this.categories = this.catalogService.getCategories();
  }
}
