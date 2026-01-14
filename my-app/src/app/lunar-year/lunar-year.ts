import { Component } from '@angular/core';

@Component({
  selector: 'app-lunar-year',
  standalone: false,
  templateUrl: './lunar-year.html',
  styleUrl: './lunar-year.css',
})
export class LunarYear {
  days: number[] = [];
  months: number[] = [];
  years: number[] = [];
  selectedDay: number = 1;
  selectedMonth: number = 1;
  selectedYear: number = 2026;
  result: any = null;

  constructor() {
    for (let i = 1; i <= 31; i++) this.days.push(i);
    for (let i = 1; i <= 12; i++) this.months.push(i);
    for (let i = 1980; i <= 2030; i++) this.years.push(i);
  }

  convert() {
    try {
      // Validate và convert về number
      const day = Number(this.selectedDay);
      const month = Number(this.selectedMonth);
      const year = Number(this.selectedYear);

      if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
        console.error('Invalid input values:', this.selectedDay, this.selectedMonth, this.selectedYear);
        return;
      }

      console.log('Converting:', day, month, year, typeof day, typeof month, typeof year);
      
      this.result = null;
      const timeZone = 7; // Việt Nam

      const lunar = this.convertSolar2Lunar(
        day,
        month,
        year,
        timeZone
      );

      const [lDay, lMonth, lYear, isLeap] = lunar;

      // Validate kết quả
      if (!lDay || !lMonth || !lYear || lDay < 1 || lDay > 30 || lMonth < 1 || lMonth > 12) {
        console.error('Invalid lunar date:', lunar);
        this.result = {
          error: 'Lỗi tính toán, vui lòng thử lại'
        };
        return;
      }

      const date = new Date(year, month - 1, day);
      const weekday = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'][date.getDay()];

      const can = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
      const chi = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

      // Can Chi năm âm lịch
      const canYearIdx = (lYear + 6) % 10;
      const chiYearIdx = (lYear + 8) % 12;

      // Can Chi ngày
      const jd = this.jdFromDate(day, month, year);
      const canDayIdx = (jd + 9) % 10;
      const chiDayIdx = (jd + 1) % 12;

      // Can Chi tháng âm lịch
      // Công thức: Tính Can tháng Giêng, các tháng sau cộng thêm
      let canMonthIdx: number;
      if (canYearIdx === 0 || canYearIdx === 5) { // Giáp hoặc Kỷ
        canMonthIdx = 2; // Bính
      } else if (canYearIdx === 1 || canYearIdx === 6) { // Ất hoặc Canh
        canMonthIdx = 4; // Mậu
      } else if (canYearIdx === 2 || canYearIdx === 7) { // Bính hoặc Tân
        canMonthIdx = 6; // Canh
      } else if (canYearIdx === 3 || canYearIdx === 8) { // Đinh hoặc Nhâm
        canMonthIdx = 8; // Nhâm
      } else { // Mậu hoặc Quý
        canMonthIdx = 0; // Giáp
      }
      
      // Cộng thêm (tháng - 1) để tính các tháng sau tháng Giêng
      canMonthIdx = (canMonthIdx + lMonth - 1) % 10;
      
      // Chi tháng: Tháng 1 = Dần (index 2), tháng 2 = Mão (index 3)...
      const chiMonthIdx = (lMonth + 1) % 12;

      let monthDisplay = lMonth.toString();
      if (isLeap === 1) monthDisplay += ' nhuận';

      this.result = {
        weekDay: weekday,
        lunarDate: `${lDay}/${monthDisplay}/${lYear}`,
        lunarYearName: `${can[canYearIdx]} ${chi[chiYearIdx]}`,
        lunarMonthName: `${can[canMonthIdx]} ${chi[chiMonthIdx]}`,
        lunarDayName: `${can[canDayIdx]} ${chi[chiDayIdx]}`
      };
    } catch (error) {
      console.error('Convert error:', error);
      this.result = {
        error: 'Lỗi tính toán, vui lòng thử lại'
      };
    }
  }

  clear() {
    this.result = null;
  }

  /* ========== THUẬT TOÁN ÂM LỊCH VN ========== */
  private INT(d: number): number {
    return Math.floor(d);
  }

  private jdFromDate(dd: number, mm: number, yy: number): number {
    const a = this.INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    const jd = dd + this.INT((153 * m + 2) / 5) + 365 * y + 
               this.INT(y / 4) - this.INT(y / 100) + this.INT(y / 400) - 32045;
    return jd;
  }

  private getNewMoonDay(k: number, timeZone: number): number {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = Math.PI / 180;
    
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 += 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 -= 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 -= 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 += 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    
    let deltat;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    
    const jdNew = Jd1 + C1 - deltat;
    return this.INT(jdNew + 0.5 + timeZone / 24);
  }

  private getSunLongitude(jdn: number, timeZone: number): number {
    const T = (jdn - 0.5 - timeZone / 24 - 2451545.0) / 36525;
    const T2 = T * T;
    const dr = Math.PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L - 360 * this.INT(L / 360);
    return this.INT(L / 30);
  }

  private getLunarMonth11(yy: number, timeZone: number): number {
    const off = this.jdFromDate(31, 12, yy) - 2415021;
    const k = this.INT(off / 29.530588853);
    let nm = this.getNewMoonDay(k, timeZone);
    const sunLong = this.getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
      nm = this.getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  private getLeapMonthOffset(a11: number, timeZone: number): number {
    const k = this.INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    let last = 0;
    let i = 1;
    let arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  private convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone: number): [number, number, number, number] {
    const dayNumber = this.jdFromDate(dd, mm, yy);
    const k = this.INT((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = this.getNewMoonDay(k + 1, timeZone);
    
    if (monthStart > dayNumber) {
      monthStart = this.getNewMoonDay(k, timeZone);
    }
    
    let a11 = this.getLunarMonth11(yy, timeZone);
    let b11 = this.getLunarMonth11(yy + 1, timeZone);
    
    let lunarYear: number;
    let lunarMonth: number;
    let lunarLeap = 0;
    
    // Xác định năm âm lịch
    if (dayNumber >= a11) {
      lunarYear = yy + 1;
    } else {
      lunarYear = yy;
      b11 = a11;
      a11 = this.getLunarMonth11(yy - 1, timeZone);
    }
    
    const lunarDay = dayNumber - monthStart + 1;
    const diff = this.INT((monthStart - a11) / 29);
    lunarMonth = diff + 11;
    
    // Xử lý năm nhuận
    if (b11 - a11 > 365) {
      const leapMonthDiff = this.getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    
    if (lunarMonth > 12) {
      lunarMonth -= 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    
    return [lunarDay, lunarMonth, lunarYear, lunarLeap];
  }
}