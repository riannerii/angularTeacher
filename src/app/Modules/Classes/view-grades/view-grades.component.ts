import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-grades',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-grades.component.html',
  styleUrl: './view-grades.component.css'
})
export class ViewGradesComponent implements OnInit{

  ngOnInit(): void {
      console.log("hello grades")
  }

}
