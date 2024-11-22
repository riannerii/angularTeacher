import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Attendance {
  present: string[];
  absent: string[];
}

@Component({
  selector: 'app-check-attendance',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './check-attendance.component.html',
  styleUrl: './check-attendance.component.css'
})
export class CheckAttendanceComponent {
  currentMonth: number = 0;
  currentYear: number = 0;
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  calendar: number[][] = [];
  selectedDay: number | null = null;
  presentStudents: string[] = [];
  absentStudents: string[] = [];

  // Attendance data with a numeric index signature
  attendanceData: { [key: number]: Attendance } = {
    1: { present: ['Miko Ofiaza', 'Glenson Lozada', 'Jhonnel Manaois', 'Arjay Subido'], absent: ['Dionece Collano'] },
    2: { present: ['Miko Ofiaza', 'Glenson Lozada', 'Jhonnel Manaois', 'Arjay Subido'], absent: ['Dionece Collano'] },
    3: { present: ['Miko Ofiaza', 'Glenson Lozada', 'Jhonnel Manaois', 'Arjay Subido'], absent: ['Dionece Collano'] },
    4: { present: ['Miko Ofiaza', 'Glenson Lozada', 'Jhonnel Manaois', 'Arjay Subido'], absent: ['Dionece Collano'] },
    5: { present: ['Miko Ofiaza', 'Glenson Lozada', 'Jhonnel Manaois', 'Arjay Subido'], absent: ['Dionece Collano'] },
    6: { present: ['Miko Ofiaza', 'Glenson Lozada', 'Jhonnel Manaois', 'Arjay Subido'], absent: ['Dionece Collano'] },
    7: { present: ['Miko Ofiaza', 'Glenson Lozada', 'Jhonnel Manaois', 'Arjay Subido'], absent: ['Dionece Collano'] },
    // Add more data here as needed
  };

  ngOnInit() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    
    this.calendar = [];
    let week: number[] = Array(firstDayOfMonth).fill(0);

    for (let day = 1; day <= totalDaysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        this.calendar.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      week = week.concat(Array(7 - week.length).fill(0));
      this.calendar.push(week);
    }
  }

  onDayClick(day: number) {
    if (day !== 0) {
      this.selectedDay = day;
      
      // Get attendance data for the selected day, or default to empty arrays if no data
      const attendance = this.attendanceData[day] || { present: [], absent: [] };
      this.presentStudents = attendance.present;
      this.absentStudents = attendance.absent;

      // Show modal
      const modal = document.getElementById('attendanceModal');
      if (modal) {
        modal.style.display = 'block';
      }
    }
  }

  closeModal() {
    this.selectedDay = null;

    // Hide modal
    const modal = document.getElementById('attendanceModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }
}
