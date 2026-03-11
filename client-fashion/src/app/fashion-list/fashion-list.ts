import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FashionService } from '../fashion.service';
import { Fashion } from '../fashion';

@Component({
  selector: 'app-fashion-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fashion-list.html',
  styleUrl: './fashion-list.css'
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];
  groupedFashions: { [style: string]: Fashion[] } = {};
  styles: string[] = [];
  selectedStyle: string = '';

  constructor(private fashionService: FashionService) {}

  ngOnInit(): void {
    this.loadStyles();
    this.loadFashions();
  }

  loadStyles(): void {
    this.fashionService.getStyles().subscribe({
      next: (data) => this.styles = data,
      error: (err) => console.error(err)
    });
  }

  loadFashions(): void {
    if (this.selectedStyle) {
      this.fashionService.getFashionsByStyle(this.selectedStyle).subscribe({
        next: (data) => {
          this.fashions = data;
          this.groupFashions();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.fashionService.getFashions().subscribe({
        next: (data) => {
          this.fashions = data;
          this.groupFashions();
        },
        error: (err) => console.error(err)
      });
    }
  }

  groupFashions(): void {
    this.groupedFashions = {};
    for (const item of this.fashions) {
      if (!this.groupedFashions[item.Style]) {
        this.groupedFashions[item.Style] = [];
      }
      this.groupedFashions[item.Style].push(item);
    }
  }

  onStyleChange(): void {
    this.loadFashions();
  }
}
