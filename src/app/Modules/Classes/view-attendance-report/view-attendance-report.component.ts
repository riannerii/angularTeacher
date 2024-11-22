import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-attendance-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-attendance-report.component.html',
  styleUrl: './view-attendance-report.component.css'
})

export class ViewAttendanceReportComponent implements OnInit {

  classInfo: any;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  colors = ['gray', 'green', 'orange', 'red']; 
  weekdays = [0, 1, 2, 3, 4];
  today = new Date();
  currentDate: string;
  students: any[] = []; 

  constructor(
    private klase: ConnectService, 
    private aroute: ActivatedRoute
  )
  {
    this.currentDate = this.getCurrentDate();
  }

  ngOnInit(): void {
    console.log("CHECK ATTENDANCE")
    console.log(this.today)  
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid')
      this.getClassInfo(cid);
      // this.getClassAttendance(cid);
      this.loadAttendanceForWeek(cid);
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

  getClassInfo(cid:any){
    this.klase.getClassInfo(cid).subscribe((result: any) => { 
      this.classInfo = result;
      // console.log(this.classInfo);
    })
  } 
  
  handleClick(idnum: number, day: number) {
    if (!this.students[idnum].attendance[day]) {
      this.students[idnum].attendance[day] = { status: 0 };
    }
  
    let currentStatus = this.students[idnum].attendance[day].status;
    const newStatus = (currentStatus + 1) % 4; // Cycle through statuses (0 = No Record, 1 = Present, 2 = Late, 3 = Absent)
  
    // Map the numeric status to the corresponding string value that the backend expects
    const statusLabels = ['no_record', 'present', 'late', 'absent'];
    const statusText = statusLabels[newStatus];
  
    // Update the student's attendance status for the specific day
    this.students[idnum].attendance[day].status = newStatus;
  
    const studentLRN = this.students[idnum].LRN;
  
    // Calculate the date for the specific day clicked
    const calculatedDate = new Date(this.today);
    calculatedDate.setDate(this.today.getDate() - (this.today.getDay() - 1) + day);
  
    // Format the date as 'YYYY-MM-DD'
    const formattedDate = calculatedDate.toISOString().split('T')[0];
  
    // Log the student's LRN, updated status, and the date for debugging
    console.log(`LRN: ${studentLRN}, Status: ${statusText}, Date: ${formattedDate}`);
  
    // Save the updated attendance status to the database
    this.updateAttendance(studentLRN, formattedDate, statusText);
  }
  

  // Function to load attendance data for the specific week
  loadAttendanceForWeek(cid: any) {
    this.klase.getClassAttendance(cid).subscribe((result: any) => {

      this.classInfo = result;

      // Calculate the start and end date of the current week
      const startOfWeek = new Date(this.today);
      startOfWeek.setDate(this.today.getDate() - this.today.getDay() + 1); // Monday of the current week

      const endOfWeek = new Date(this.today);
      endOfWeek.setDate(startOfWeek.getDate() + 4); // Friday of the current week

      // Filter and map the attendance data to only include dates within the current week
      this.students = this.classInfo.students.map((student: any) => {
        return {
          LRN: student.id, 
          name: student.name, 
          attendance: this.weekdays.map((dayOffset: number) => {
            const cellDate = new Date(startOfWeek);
            cellDate.setDate(startOfWeek.getDate() + dayOffset); //pang compute sa date sa bawat cell

            const formattedDate = cellDate.toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
            const attendanceRecord = student.attendance.find((att: any) => att.date === formattedDate);

            return {
              day: formattedDate, // Store the calculated date for reference
              status: attendanceRecord ? 
                (attendanceRecord.status === 'present' ? 1 : 
                attendanceRecord.status === 'absent' ? 3 : 
                attendanceRecord.status === 'late' ? 2 : null) 
                : 0 // Default to Absent if no attendance record is found
            };
          })
        };
      });
    });
  }

  updateAttendance(LRN: string, date: string, status: string) {
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid')!;
    const payload = {
      attendance: [
        { LRN: String(LRN), date, status }
      ]
    };
  
    this.klase.updateClassAttendance(cid, payload).subscribe((response: any) => {
      console.log(response.message);
    }, (error) => {
      console.error('Error updating attendance', error); 
      // Swal.fire({
      //   icon: "success",
      //   text: "Attendance updated!",
      //   showConfirmButton: false,
      //   timer: 800
      // });
    });
    
  }
  

  onPreviousWeek() {
    this.today.setDate(this.today.getDate() - 7); // Move to the previous week
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid');
    this.loadAttendanceForWeek(cid); // Load the data for the previous week
  }

  onNextWeek() {
    this.today.setDate(this.today.getDate() + 7); // Move to the next week
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid');
    this.loadAttendanceForWeek(cid); // Load the data for the next week
  }

  
  
  
  

 

  
}


