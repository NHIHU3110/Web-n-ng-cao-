import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb2',
  standalone: false,
  templateUrl: './ptb2.html',
  styleUrl: './ptb2.css',
})
export class Ptb2 {
  get_solution(
    hsa: HTMLInputElement,
    hsb: HTMLInputElement,
    hsc: HTMLInputElement,
    result: HTMLElement
  ) {
    let a = parseFloat(hsa.value);
    let b = parseFloat(hsb.value);
    let c = parseFloat(hsc.value);

    if (a === 0) {
      result.innerText = 'Đây không phải PT bậc 2';
      return;
    }

    let delta = b * b - 4 * a * c;

    if (delta < 0) {
      result.innerText = 'Phương trình vô nghiệm';
    } else if (delta === 0) {
      let x = -b / (2 * a);
      result.innerText = 'Nghiệm kép x = ' + x;
    } else {
      let x1 = (-b + Math.sqrt(delta)) / (2 * a);
      let x2 = (-b - Math.sqrt(delta)) / (2 * a);
      result.innerText = `x1 = ${x1}, x2 = ${x2}`;
    }
  }

  clear_data(
    hsa: HTMLInputElement,
    hsb: HTMLInputElement,
    hsc: HTMLInputElement,
    result: HTMLElement
  ) {
    hsa.value = '';
    hsb.value = '';
    hsc.value = '';
    result.innerText = '';
    hsa.focus();
  }
}
