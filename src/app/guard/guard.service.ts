import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Route, Router } from '@angular/router';
import { AuthguardService } from 'src/services/auth/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
  

  constructor(private auth: AuthguardService, private router: Router, private snackBar: MatSnackBar) { }
  canActivate(): boolean {
    if(this.auth.isLoggedIn()) {
      return true;
    }else{
      this.snackBar.open('You are not logged in', 'Close', {
        duration: 8000,
    });
    this.router.navigate(['login']);
    return false;
  }
  }
}