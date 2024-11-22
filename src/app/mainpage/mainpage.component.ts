import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; // Import BreakpointObserver
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SidenavComponent,
    MatBadgeModule,
    MatMenuModule,
    MatListModule,
  ],
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'], // Corrected "styleUrl" to "styleUrls"
})
export class MainpageComponent implements OnInit {
  collapsed = signal(false);

  // Dynamically calculate sidenav width based on state
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  role = '';
  lname = '';
  fname = '';
  mname = '';
  adminPic: string | null = null;

  isSmallScreen = false; // To track if the screen is small

  constructor(
    private connect: ConnectService,
    private breakpointObserver: BreakpointObserver // Inject BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.loadUserData();

    // Subscribe to BreakpointObserver to watch screen size changes
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
      this.isSmallScreen = result.matches; // Update isSmallScreen based on match
      if (this.isSmallScreen) {
        this.collapsed.set(true); // Collapse sidenav on small screens
      }
    });

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
}
