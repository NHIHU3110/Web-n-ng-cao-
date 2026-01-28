import { Component } from '@angular/core';

@Component({
  selector: 'app-ex24-math',
  standalone: false,
  templateUrl: './ex24-math.html',
  styleUrl: './ex24-math.css',
})
export class Ex24Math {
  a: string = '';
  b: string = '';
  c: string = '';
  result: string | number = '';

  isNumber(val: string): boolean {
    if (val === '') return true; // Don't show error if empty
    return !isNaN(Number(val));
  }

  get isValid(): boolean {
    return this.isNumber(this.a) && this.isNumber(this.b) && this.isNumber(this.c);
  }

  getMax() {
    if (this.isValid) {
      this.result = Math.max(Number(this.a), Number(this.b), Number(this.c));
    }
  }

  getMin() {
    if (this.isValid) {
      this.result = Math.min(Number(this.a), Number(this.b), Number(this.c));
    }
  }

  getSin() {
    if (this.isNumber(this.a)) {
      this.result = Math.sin(Number(this.a) * (Math.PI / 180));
    }
  }

  getCos() {
    if (this.isNumber(this.a)) {
      this.result = Math.cos(Number(this.a) * (Math.PI / 180));
    }
  }

  getPow() {
    if (this.isNumber(this.a) && this.isNumber(this.b)) {
      this.result = Math.pow(Number(this.a), Number(this.b));
    }
  }
}
