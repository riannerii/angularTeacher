import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink, RouterModule } from '@angular/router';
import { ConnectService } from '../connect.service';


export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
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

  constructor(private connect: ConnectService) {}

  ngOnInit(): void {

    this.loadUserData();
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
    // {
    //   icon: 'campaign',
    //   label: 'Announcements',
    //   route: 'announcement' 
    // },
    {
      icon: 'message',
      label: 'Messages',
      route: 'messages'
    },
    // {
    //   icon: 'account_circle',
    //   label: 'My Account',
    //   route: 'account'
    // },
    // {
    //   icon: 'logout',
    //   label: 'Logout',
    //   route: 'login'
    // }
  ])

  profilePicSize = computed (() => this.sideNavCollapsed() ? '32' : '100');
}
