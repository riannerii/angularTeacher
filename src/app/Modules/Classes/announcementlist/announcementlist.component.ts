import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-announcementlist',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, ReactiveFormsModule, RouterModule, FormsModule,],
  templateUrl: './announcementlist.component.html',
  styleUrl: './announcementlist.component.css'
})
export class AnnouncementlistComponent implements OnInit {
  announcements: any;
  classInfo:any;

  constructor(private klase: ConnectService, private router: Router, private aroute: ActivatedRoute) {} 

  ngOnInit(): void {
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid') 
    console.warn(cid); 
    this.getClassInfo(cid);
    this.getClassAnnouncements(cid);
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
        this.announcementform.reset()
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

  getClassAnnouncements(cid:any){
    this.klase.getClassAnnouncements(cid).subscribe((result:any) => {
      this.announcements = result;
      console.warn(this.announcements); 
    });
  }

  onDelete(ancmnt_id: number): void { 
    
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.klase.deleteAnnouncement(ancmnt_id).subscribe(
          response => {
            console.log('Deleting announcement:', response.message);
            Swal.fire({
              title: "Deleted!",
              text: "Your announcement has been deleted successfully.",
              icon: "success"
            });
            this.getClassAnnouncements(this.aroute.snapshot.parent?.paramMap.get('cid'));
          },
          error => {
            console.error('Error deleting announcement:', error);
            if (error.status) {
              console.error('HTTP Status:', error.status);
            }
            if (error.error && error.error.message) {
              console.error('Server message:', error.error.message);
            } else {
              console.error('Unexpected error format:', error);
            }
          }
        );
      }
    });
  }

  

}
