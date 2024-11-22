
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { ConnectService } from '../connect.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [ConnectService],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private connect: ConnectService,
    private router: Router
  ){}

  login(){
    this.connect.login(this.loginForm.value).subscribe(
      (result:any) => {
        if (result.token != null) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('admin_id', result.admin.admin_id);

          const user = result.admin;
          if (user && user.admin_pic) {
            if (!user.admin_pic.startsWith('http://localhost:8000')) {
              user.admin_pic = `http://localhost:8000/assets/adminPic/${user.admin_pic}`;
            }
          }
          localStorage.setItem('user', JSON.stringify(user));

          console.log('Token stored:', result.token);
          Swal.fire({
            icon: "success",
            text: "Logged in successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          this.navigateToMainPage();
        }
        else{
          Swal.fire({
            icon: "error",
            text: "Invalid email or password",
            showConfirmButton: false,
            timer: 1500
          });
        }
        console.log(result);
      },
      (error) => {
        Swal.fire({
          icon: "error",
          text: "Invalid email or password",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  navigateToMainPage(){
    console.log('Router:', this.router);
    this.router.navigate(['/main']);
  }

  // login(){
  //   this.connect.login(this.loginForm.value).subscribe((result:any) =>{
  //     if (result.token != null) {
  //       if (typeof window !== 'undefined' && window.localStorage){
  //         localStorage.setItem('token', result.token);
  //         localStorage.setItem('id', result.id);
  //       }
  //       this.router.navigate(['/main']);
  //     }
  //     console.log(result);
  //   });
  // }
}
