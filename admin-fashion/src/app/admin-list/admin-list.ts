import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FashionService } from '../fashion.service';
import { Fashion } from '../fashion';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-list.html',
  styleUrl: './admin-list.css'
})
export class AdminListComponent implements OnInit {
  fashions: Fashion[] = [];

  constructor(
    private fashionService: FashionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.fashionService.getFashions().subscribe({
      next: (data) => this.fashions = data,
      error: (err) => console.error(err)
    });
  }

  viewDetail(id: string): void {
    // Assuming you want it to open the client app in a new tab, or just navigate to an edit view
    // Here we'll just navigate to edit for simplicity in Admin
    this.router.navigate(['/fashions/edit', id]);
  }

  editFashion(id: string): void {
    this.router.navigate(['/fashions/edit', id]);
  }

  deleteFashion(id: string): void {
    if (confirm('Are you sure you want to delete this fashion item?')) {
      this.fashionService.deleteFashion(id).subscribe({
        next: () => {
          // Removes the deleted item from the local array
          this.fashions = this.fashions.filter(f => f._id !== id);
          alert('Deleted successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting item');
        }
      });
    }
  }
}
