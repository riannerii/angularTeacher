import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-home',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
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
  inquiries:any;
  uid:any;

  isLoadingInquiries = true;

  constructor
  (private klase: ConnectService)
  {
    this.currentDay = this.getCurrentDay();
    this.currentDate = this.getCurrentDate();
  }

  ngOnInit(): void {
    this.uid = localStorage.getItem('admin_id');
    this.getClassesToday()
    this.loadUserData();
    this.getInquiry();
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

  getInquiry() {
    this.klase.getInquiries(this.uid).subscribe((result: any) => {
      this.inquiries = result;
      this.inquiries.forEach((inquiry:any) => {
        console.log(inquiry);

        const uniqueMessages = [];
        const seenSenders = new Set();
  
        for (const msg of result) {
            if (!seenSenders.has(msg.sender_name)) {
                seenSenders.add(msg.sender_name);
                uniqueMessages.push(msg);
            }
        }
  
        this.inquiries = uniqueMessages;
      });
      this.isLoadingInquiries = false;
    })
  }

  
    

}
