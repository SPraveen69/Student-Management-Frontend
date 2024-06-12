import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/services/auth/authguard.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm : FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthguardService, private router: Router, private snackBar: MatSnackBar){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    })

  }

  OnRegister(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.snackBar.open('The Account Creation is successful', 'Close', {
            duration: 8000,
        })
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('This Username is already exist', 'Close', {
            duration: 8000,
        })
        },
      });
    }else{
      console.log("Please check the details again");
    }
  }

  onBack(): void{
    this.router.navigate(['/login']);
  }

}
