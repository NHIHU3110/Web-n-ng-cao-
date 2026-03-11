import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FashionService } from '../fashion.service';
import { Fashion } from '../fashion';

@Component({
  selector: 'app-fashion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css'
})
export class FashionDetailComponent implements OnInit {
  fashion: Fashion | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private fashionService: FashionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fashionService.getFashionById(id).subscribe({
        next: (data) => {
          this.fashion = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Fashion item not found or error loading details.';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'Invalid fashion ID.';
      this.loading = false;
    }
  }
}
