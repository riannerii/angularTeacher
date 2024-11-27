import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-messages',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './main-messages.component.html',
  styleUrl: './main-messages.component.css'
})
export class MainMessagesComponent {

}
