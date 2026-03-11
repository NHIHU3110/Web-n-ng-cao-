import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FashionService } from '../fashion.service';
import { Fashion } from '../fashion';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, QuillModule],
  templateUrl: './admin-form.html',
  styleUrl: './admin-form.css'
})
export class AdminFormComponent implements OnInit {
  fashion: Partial<Fashion> = {
    title: '',
    thumbnail: '',
    Style: '',
    details: ''
  } as Partial<Fashion>;
  isEditMode = false;
  fashionId: string = '';

  constructor(
    private fashionService: FashionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.fashionId = id;
      this.loadFashion(id);
    }
  }

  loadFashion(id: string): void {
    this.fashionService.getFashionById(id).subscribe({
      next: (data) => {
        this.fashion = {
          title: data.title,
          thumbnail: data.thumbnail,
          Style: data.Style,
          details: data.details
        };
      },
      error: (err) => {
        console.error(err);
        alert('Could not load fashion details');
      }
    });
  }

  saveFashion(): void {
    if (!this.fashion.title || !this.fashion.Style) {
      alert('Title and Style are required');
      return;
    }

    if (this.isEditMode) {
      this.fashionService.updateFashion(this.fashionId, this.fashion).subscribe({
        next: () => {
          alert('Updated successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert('Error updating fashion');
        }
      });
    } else {
      this.fashionService.createFashion(this.fashion).subscribe({
        next: () => {
          alert('Created successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert('Error creating fashion');
        }
      });
    }
  }
}
