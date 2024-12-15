import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink, RouterModule } from '@angular/router';
import { ConnectService } from '../connect.service';
import { MatBadgeModule } from '@angular/material/badge';


export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  unreadCount?: any;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule, RouterLink, MatBadgeModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  template: `
    <a mat-list-item [routerLink]="item.route" class="menu-item" routerLinkActive="selected-menu-item">
    <mat-icon [matBadge]="item.unreadCount > 0 ? item.unreadCount : null" matBadgeColor="warn">
      {{ item.icon }}
    </mat-icon>
      <span>{{ item.label }} yo</span>
    </a>
  `,
  styles: [`
    .badge {
      background-color: red;
      color: white;
      border-radius: 12px;
      padding: 0 6px;
      margin-left: 8px;
    }
  `]
})

export class SidenavComponent implements OnInit {

  @Input() item: any;

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val)
  }
  // Properties for role and last name
  role = '';
  lname = '';
  fname = '';
  mname = '';
  adminPic: string | null = null;
  uid: any;

  private intervalId: any;  
  unreadMessagesCount: any = 0;

  constructor(private connect: ConnectService) {}

  ngOnInit(): void {

    this.uid = localStorage.getItem('admin_id')

    this.loadUserData();

    this.intervalId = setInterval(() => {
      this.loadUnreadMessagesCount();
    }, 10000)


    this.connect.adminPic$.subscribe((newImageUrl) => {
      if (newImageUrl) {
        this.adminPic = newImageUrl; // Update the component's admin picture
      }
    });

    // Optionally, initialize with the image from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.admin_pic) {
      this.adminPic = user.admin_pic;
    }
  }
   

  loadUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
        const parsedData = JSON.parse(userData);
        this.role = parsedData.role || '';
        this.lname = parsedData.lname || '';
        this.fname = parsedData.fname || '';
    } 
  }

  loadUnreadMessagesCount() {
    if (this.uid) {
      this.connect.getUnreadMessagesCount(this.uid).subscribe(response => {
        console.log(response)
        this.unreadMessagesCount = response; // Extract the count from the response
        console.log('Unread Messages Count:', this.unreadMessagesCount); // Check value here
        this.updateMenuItems(); // Update menu items with the new count
      });
    }
  }
  
  updateMenuItems() {
    this.menuItems.set([
      {
        icon: 'home',
        label: 'Home',
        route: 'home'
      },
      {
        icon: 'event_available',
        label: 'My Classes',
        route: 'classes'
      },
      {
        icon: 'message',
        label: 'Messages',
        route: 'messages',
        unreadCount: this.unreadMessagesCount // Ensure this is set correctly
      },
    ]);
  }
  

  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: 'home'
    },
    {
      icon: 'event_available',
      label: 'My Classes',
      route: 'classes'
    },
    {
      icon: 'message',
      label: 'Messages',
      route: 'messages',
      unreadCount: this.unreadMessagesCount
    },
  ])

  trackByFn(index: number, item: MenuItem) {
    return item.route; // or any unique identifier
  }


  profilePicSize = computed (() => this.sideNavCollapsed() ? '32' : '100');
}
