import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { log } from 'console';

@Component({
  selector: 'app-view-rosterlist',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './view-rosterlist.component.html',
  styleUrl: './view-rosterlist.component.css'
})
export class ViewRosterlistComponent implements OnInit{
  classInfo: any;
 
  constructor(
    private klase: ConnectService, 
    private aroute: ActivatedRoute)
  {}

  ngOnInit(): void {
    console.log("VIEW ROSTER LIST")
    const cid = this.aroute.snapshot.parent?.paramMap.get('cid')
    // const cid = this.aroute.parent?.children.params.subscribe(params =>{
    //   console.log(params)
    // }) 
      // this.getclasses()  
      this.getClassInfo(cid);
      // console.log(this.aroute.snapshot)
  }
  
  getClassInfo(cid:any){
    this.klase.getClassInfo(cid).subscribe((result: any) => {
      this.classInfo = result;
      console.log(this.classInfo);
    }) 
  } 

}
