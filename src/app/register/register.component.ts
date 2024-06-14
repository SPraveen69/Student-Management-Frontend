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

  OnRegister(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.router.navigate(['/login']);
          this.snackBar.open('Your account is now active. Welcome to the community!', 'Close', {
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
    this.showErrorMessage('PLEASE CHECK All THE NECCESSARY FIELDS ARE SET');
    }
  }

  onBack(): void{
    this.router.navigate(['/login']);
  }

}
