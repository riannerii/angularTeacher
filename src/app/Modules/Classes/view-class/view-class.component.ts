import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-class',
  standalone: true,
  imports: [RouterLink, CommonModule, MatButtonModule],
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class ViewClassComponent implements OnInit {

  classes: any = [];
  filteredClasses: any = []; 
  students: any;
  selectedFilter: string = 'All';
  selectedSemester: number | null = null; // Track selected semester
  showSemesterButtons: boolean = false; // Control visibility of semester buttons

  constructor(private klase: ConnectService) {}

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses() {
    this.klase.getclasses().subscribe((result: any) => {
      this.classes = result;
      this.filteredClasses = result; // Initially, all classes are shown
      console.warn('Fetched classes:', this.classes);
    });
  }

  toggleSemesterButtons() {
    this.showSemesterButtons = true; // Show semester buttons when SHS is clicked
    this.selectedSemester = null; // Reset semester selection
    this.filterClasses('SHS'); // Optionally filter classes for SHS
  }

  filterClasses(type: string, semester?: number) {
    this.selectedFilter = type;
    this.selectedSemester = semester || null;

    if (type === 'JHS') {
      this.filteredClasses = this.classes.filter((cl: any) => !cl.semester);
      this.showSemesterButtons = false; // Hide semester buttons for JHS
    } else if (type === 'SHS') {
      if (semester) {
        this.filteredClasses = this.classes.filter((cl: any) => cl.semester === semester);
      } else {
        this.filteredClasses = this.classes.filter((cl: any) => cl.semester); // Show all SHS classes if no semester is selected
      }
      this.showSemesterButtons = true; // Ensure semester buttons are shown for SHS
    } else {
      this.filteredClasses = this.classes; // Show all classes for 'All'
      this.showSemesterButtons = false; // Hide semester buttons for All
    }
  }

  formatSchedule(schedule: string): string {
    const dayMap: { [key: string]: string } = {
      'Monday': 'Mon',
      'Tuesday': 'Tue',
      'Wednesday': 'Wed',
      'Thursday': 'Thu',
      'Friday': 'Fri',
      'Saturday': 'Sat',
      'Sunday': 'Sun'
    };

    // Split the schedule by commas or spaces
    const days = schedule.split(/[, ]+/);
    
    // Map the full day names to their abbreviations and filter out any undefined values
    const abbreviatedDays = days.map(day => dayMap[day.trim()]).filter(Boolean);
    
    // Join the abbreviated days into a single string
    return abbreviatedDays.join('');
  }

}