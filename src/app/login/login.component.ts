import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/services/auth/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor( private snackBar: MatSnackBar,private fb: FormBuilder, private authGuard: AuthguardService, private router: Router)
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
          this.showSuccessMessage('LOGGED IN');
        },
        error: (err) => {
          console.log(err);
          this.showSuccessMessage('CHECK THE CREDENTIALS');
        },
      });    
    }else{
      this.showSuccessMessage('CHECK THE CREDENTIALS');
      console.log("Please check your credentials");
    }
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      panelClass: 'custom-snackbar'
    });
  }
  
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      panelClass: 'custom-snackbar'
    });
  }
  


  onRegister(): void {
    this.router.navigate(['/register']);
  }
  }

