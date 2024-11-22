import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../../connect.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-student-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-student-progress.component.html',
  styleUrl: './view-student-progress.component.css'
})
export class ViewStudentProgressComponent implements OnInit {
  classInfo: any;
  gradeInfo:any;
 
  constructor(
    private klase: ConnectService, 
    private aroute: ActivatedRoute)
  {}
 
  ngOnInit(): void {
    console.log("VIEW STUDENT PROGRESS")
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid')
      this.getClassInfo(cid);
      this.getClassGrades(cid); 
  }
  

  getClassInfo(cid:any){
    this.klase.getClassInfo(cid).subscribe((result: any) => {
      this.classInfo = result;
      // console.warn('Class Info');
      // console.warn(this.classInfo);
    })  
  } 

  getClassGrades(cid:any) {
    this.klase.getClassGrades(cid).subscribe((result: any) => {
      this.gradeInfo = result;
      console.warn(this.gradeInfo); 
      }) 
  }
  
  updateGrade(LRN: string, term: string, grade: number) {
    console.warn(LRN)
      const cid = this.aroute.snapshot.parent?.paramMap.get('cid')!;
      const payload = {
        
        grades: [
          { LRN: String(LRN), term, grade: Number(grade) }
        ]
      
      };
      console.log('Payload:', payload); 
  
      this.klase.updateClassGrades(cid, payload).subscribe((response: any) => {
        console.log(response.message);
      }, (error) => {
        console.error('Error updating grade', error);
      });
    }
    
   
  }

  

 