import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
// import Swal from 'sweetalert2'; 
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-view-announcement',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './view-announcement.component.html',
  styleUrl: './view-announcement.component.css'
})
export class ViewAnnouncementComponent implements OnInit {

  announcements: any;

  constructor(private klase: ConnectService, private router: Router, private aroute: ActivatedRoute) {} 

  ngOnInit(): void {
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid')
    this.getClassAnnouncements(cid);
  }

  getClassAnnouncements(cid:any){
    this.klase.getClassAnnouncements(cid).subscribe((result:any) => {
      this.announcements = result;
      console.warn(this.announcements); 
    });
  }

//   onDelete(ancmnt_id: number): void {
    
//     // Show confirmation dialog
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.announcement.deleteAnnouncement(ancmnt_id).subscribe(
//           response => {
//             console.log('Deleting announcement:', response.message);
//             Swal.fire({
//               title: "Deleted!",
//               text: "Your announcement has been deleted successfully.",
//               icon: "success"
//             });
//             this.fetchAnnouncements();
//           },
//           error => {
//             console.error('Error deleting announcement:', error);
//             if (error.status) {
//               console.error('HTTP Status:', error.status);
//             }
//             if (error.error && error.error.message) {
//               console.error('Server message:', error.error.message);
//             } else {
//               console.error('Unexpected error format:', error);
//             }
//           }
//         );
//       }
//     });
//   }

//   onUpdate(ancmnt_id: number): void {
//     localStorage.setItem('AnnouncementID', ancmnt_id.toString()); 
//     this.router.navigate(['/main-page/announcement/announcements/update', ancmnt_id]);
// }
}

// export interface Announcement {
//   id: number;
//   title: string;
//   content: string;  
// }
