import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ConnectService } from '../../../connect.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-announcement.component.html',
  styleUrl: './post-announcement.component.css'
})
export class PostAnnouncementComponent implements OnInit { 

  classInfo: any;

  constructor (private klase: ConnectService,private router: Router, private aroute: ActivatedRoute) {}

  ngOnInit(): void {
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid') 
    console.warn(cid); 
    this.getClassInfo(cid);
  } 

  announcementform = new FormGroup({
    admin_id: new FormControl(localStorage.getItem('admin_id')),
    class_id: new FormControl(''),
    title: new FormControl(''),
    announcement: new FormControl(''),
  }); 

  postannouncement() {
    this.klase.submitannouncement(this.announcementform.value).subscribe(
      (result: any) => {
        console.log('Announcement submitted successfully:', result);
        // Display success message
        Swal.fire({
          title: 'Success!',
          text: 'Your announcement was posted successfully!',
          icon: 'success',
          confirmButtonText: 'OK' // You can customize the button text
        });
        this.navigateToMainPage(); // Navigate to the main page
      },
      (error) => {
        console.error('Error submitting announcement:', error); 
      }
    );
  }
  navigateToMainPage() {
    console.log('Router:', this.router); // Check if router is defined
    this.router.navigate(['/main-page/announcement/announcementlist']);
  }

  getClassInfo(cid: any) {
    this.klase.getClassInfo(cid).subscribe((result: any) => {
      this.classInfo = result;
  
      // Dynamically update the form control for class_id
      if (this.classInfo && this.classInfo[0]?.class_id) {
        this.announcementform.patchValue({
          class_id: this.classInfo[0].class_id,
        });
      }
    });
  }
  
}
