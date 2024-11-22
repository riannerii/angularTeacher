import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { ViewRosterlistComponent } from "../view-rosterlist/view-rosterlist.component";
import { ViewAttendanceReportComponent } from "../view-attendance-report/view-attendance-report.component";
import { ViewStudentProgressComponent } from "../view-student-progress/view-student-progress.component";
import { ViewGradesComponent } from "../view-grades/view-grades.component";

@Component({
  selector: 'app-view-subject',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterModule,],
  templateUrl: './view-subject.component.html',
  styleUrl: './view-subject.component.css'
})
export class ViewSubjectComponent implements OnInit {

  classes: any;
  students: any;
  classInfo: any;

  constructor(
    private klase: ConnectService, 
    private aroute: ActivatedRoute)
  {}

  ngOnInit(): void {
    const cid = this.aroute.snapshot.paramMap.get('cid') 
      this.getclasses()
      this.getClassInfo(cid);
      // this.aroute.parent?.params.subscribe(
      //   (params) =>
      //     {
      //     console.log(params);
      //     });
      // console.log(this.aroute.parent?.toString())
  }

  getclasses() {
    this.klase.getclasses().subscribe((result: any) => {
      this.classes = result;
      this.classes.forEach((cl:any) => {
        cl.subjects = cl.subject.subject_name 
        // console.log(this.classes);
        // console.log(cl.subjects);  
      })
    })
  }

  getClassInfo(cid:any){
    this.klase.getClassInfo(cid).subscribe((result: any) => {
      this.classInfo = result;
      console.log(this.classInfo);
    })
  }

}
