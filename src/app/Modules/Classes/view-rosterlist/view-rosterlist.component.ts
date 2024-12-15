import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-view-rosterlist',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatInputModule, MatInput, MatIcon],
  templateUrl: './view-rosterlist.component.html',
  styleUrls: ['./view-rosterlist.component.css']
})
export class ViewRosterlistComponent implements OnInit {
  classInfo: any;
  filteredClassInfo: any;

  constructor(private klase: ConnectService, private aroute: ActivatedRoute) {}

  ngOnInit(): void {
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid');
    this.getClassInfo(cid);
  }

  getClassInfo(cid: any): void {
    this.klase.getClassInfo(cid).subscribe((result: any) => {
      this.classInfo = result;
      this.filteredClassInfo = result;
    });
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredClassInfo = this.classInfo.filter((cl: any) =>
      cl.student_lname.toLowerCase().includes(query) ||
      cl.guardian_name.toLowerCase().includes(query)
    );
  }
}
