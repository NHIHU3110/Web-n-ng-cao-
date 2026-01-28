import { Component } from '@angular/core';
import { CustomerService } from '../customer-service';

@Component({
  selector: 'app-listcustomer2',
  standalone: false,
  templateUrl: './listcustomer2.html',
  styleUrl: './listcustomer2.css',
})
export class Listcustomer2 {
  customers: any;
  selectedMember: any = null;

  constructor(private cs: CustomerService) {
    this.customers = cs.get_all_customer();
  }

  viewProfile(member: any) {
    // Generate a mock bio if it doesn't exist
    const bios: { [key: string]: string } = {
      'Putin': 'A powerful leader known for his strategic mind and influence in global politics. Interests include judo, hockey, and nature.',
      'Trump': 'An influential business magnate and former politician. Specialized in real estate, media, and global trade branding.',
      'Kim': 'A young leader focused on national development and strategic diplomacy. Enjoys basketball and technological innovation.',
      'Tập': 'A visionary statesman leading one of the world\'s largest economies. Passionate about philosophy, history, and urban planning.'
    };

    this.selectedMember = {
      ...member,
      bio: bios[member.name] || 'A distinguished member of our VIP elite circle with a rich history of contribution to the industry.',
      joinDate: 'Jan 2024',
      location: 'Global Headquarters',
      skills: ['Leadership', 'Strategy', 'Negotiation']
    };
  }

  closeProfile() {
    this.selectedMember = null;
  }
}
