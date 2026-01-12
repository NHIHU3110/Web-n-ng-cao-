import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbiding',
  standalone: false,
  templateUrl: './learnbiding.html',
  styleUrl: './learnbiding.css',
})
export class Learnbiding {
  student_id: string= "K234111441"
  student_name: string= "John Doe"
  student_address: string= "123 Main St, Anytown"
  red_text_style={ color:'red' }
}
