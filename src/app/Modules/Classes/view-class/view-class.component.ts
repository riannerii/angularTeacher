import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-class',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-class.component.html',
  styleUrl: './view-class.component.css'
})
export class ViewClassComponent implements OnInit {

  // classes: any;
  classes: any = [];
  students: any;
  

  constructor(private klase: ConnectService){}

  ngOnInit(): void {
    this.getclasses() 
  } 

  getclasses() {
    this.klase.getclasses().subscribe((result: any) => {
      this.classes = result;
      console.log('Fetched classes:', this.classes);
      }) 
    }
  }

 
