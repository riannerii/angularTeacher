import { Routes } from "@angular/router";
import { MainClassComponent } from "./main-class/main-class.component";
import { ViewClassComponent } from "./view-class/view-class.component";
import { ViewSubjectComponent } from "./view-subject/view-subject.component";
import { ViewRosterlistComponent } from "./view-rosterlist/view-rosterlist.component";
import { CheckAttendanceComponent } from "./check-attendance/check-attendance.component";
import { ViewGradesComponent } from "./view-grades/view-grades.component";
import { AddGradesComponent } from "./add-grades/add-grades.component";
import { ViewStudentProgressComponent } from "./view-student-progress/view-student-progress.component";
import { ViewAttendanceReportComponent } from "./view-attendance-report/view-attendance-report.component";
import { ViewAnnouncementComponent } from "./view-announcement/view-announcement.component";
import { PostAnnouncementComponent } from "./post-announcement/post-announcement.component";
import { AnnouncementlistComponent } from "./announcementlist/announcementlist.component";


export const classesRoute: Routes = [
    {path: 'classespage', component: MainClassComponent,
        children: [
            {path: 'viewclasses', component: ViewClassComponent},
            {path: 'viewsubject/:cid', component: ViewSubjectComponent,
                children: [
                    {path: 'viewroster', component: ViewRosterlistComponent}, 
                    {path: 'checkattendance', component: CheckAttendanceComponent},
                    {path: 'viewgrades', component: ViewGradesComponent},
                    {path: 'addgrades', component: AddGradesComponent},
                    {path: 'viewattendanceReport', component: ViewAttendanceReportComponent},
                    {path: 'viewstudentProg', component: ViewStudentProgressComponent},
                    {path: 'viewannouncement', component: ViewAnnouncementComponent},
                    {path: 'postannouncement', component: PostAnnouncementComponent},
                    {path: 'announcementlist', component: AnnouncementlistComponent},
                    {path: '', redirectTo: 'viewroster', pathMatch:"full"}
                ]
            },
            {path: '', redirectTo: 'viewclasses', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'classespage', pathMatch: 'full'}
]