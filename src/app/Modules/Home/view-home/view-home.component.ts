import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-view-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-home.component.html',
  styleUrl: './view-home.component.css'
})
export class ViewHomeComponent implements OnInit{

  // Properties for role and last name
  role = '';
  lname = '';
  fname = '';
  adminPic: string | null = null;
  days = []
  currentDay: string;
  currentDate: string;
  classes: any;


  ngOnInit(): void {
    this.getClassesToday()
    this.loadUserData();
    this.klase.adminPic$.subscribe((newImageUrl) => {
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

  getClassesToday() {
    this.klase.getClassesToday().subscribe((result: any) => {
      this.classes = result; 
      }) 
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
  
  constructor
  (private klase: ConnectService)
  {
    this.currentDay = this.getCurrentDay();
    this.currentDate = this.getCurrentDate();
  }

  getGreeting(): string {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning, ';
    } else if (hours < 18) {
      return 'Good Afternoon, ';
    } else {
      return 'Good Evening, ';
    }
  }

  getCurrentDay(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long'
    };
    return date.toLocaleDateString(undefined, options);
  }

  getCurrentDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  }

  
    

}
