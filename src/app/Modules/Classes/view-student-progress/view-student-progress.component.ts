import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../../connect.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-student-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-student-progress.component.html',
  styleUrl: './view-student-progress.component.css'
})
export class ViewStudentProgressComponent implements OnInit {
  classInfo: any;
  gradeInfo: any;

  constructor(
    private klase: ConnectService,
    private aroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log("VIEW STUDENT PROGRESS");
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid');
    this.getClassInfo(cid);
    this.getClassGrades(cid);
    console.warn(cid);
  }

  getClassInfo(cid: any) {
    this.klase.getClassInfo(cid).subscribe((result: any) => {
      this.classInfo = result;
      // console.warn('Class Info');
      // console.warn(this.classInfo);
    });
  }

  getClassGrades(cid: any) {
    this.klase.getClassGrades(cid).subscribe((result: any) => {
      this.gradeInfo = result;
      console.warn(this.gradeInfo);
    });
  }

  savingStatus: { [key: string]: boolean } = {}; // Tracks saving status for each grade field

  updateGrade(LRN: string, term: string, grade: number) {
    console.warn(LRN);
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid')!;
    const payload = {
        grades: [
            {
                LRN: String(LRN),
                term,
                grade: Number(grade),
                permission: 'none'
            }
        ]
    };
    console.log('Payload:', payload);

    const key = `${LRN}-${term}`; // Unique key for each grade field
    this.savingStatus[key] = true; // Start saving

    this.klase.updateClassGrades(cid, payload).subscribe(
        (response: any) => {
            console.log(response.message);
            this.savingStatus[key] = false; // Saving complete
        },
        (error) => {
            console.error('Error updating grade', error);
            this.savingStatus[key] = false; // Reset saving status on error
        }
    );
}

  editRequestActive: boolean = false; // Track the visibility of Edit buttons

  // Toggle visibility of Edit buttons
  toggleEditRequest() {
    this.editRequestActive = !this.editRequestActive;
  }

  // Function to handle updating permission
  editGradePermission(LRN: string, term: string, grade: number) {
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid')!; // Get the class ID (cid) from the route

    // Construct the payload to match the structure of `updateGrade`
    const payload = {
      grades: [
        {
          LRN: String(LRN),
          term,
          grade: Number(grade),
          permission: 'pending'
        }
      ]
    };

    console.log('Payload:', payload); // Log the payload for debugging

    // Call the `updateClassGrades` method (or the appropriate API method) with the payload
    this.klase.updateClassGrades(cid, payload).subscribe(
      (response: any) => {
        console.log('Permission updated to pending', response);

        // Update the permission locally after a successful response
        const student = this.gradeInfo.find((cl: { LRN: string }) => cl.LRN === LRN);
        if (student) {
          student[`permission_${term}`] = 'pending'; // Update the permission field locally
        }
      },
      (error) => {
        console.error('Error updating permission', error);
      }
    );
  }
}
