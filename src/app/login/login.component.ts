import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/services/auth/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authGuard: AuthguardService, private router: Router)
  {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  OnLogin(){
    if(this.loginForm.valid){
      this.authGuard.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.authGuard.storeToken(res.token);
          this.router.navigate(['/studenthub']);
        },
        error: (err) => {
          console.log(err);
        },
      });    
    }else{
      console.log("Please check your credentials");
    }
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }
  }

