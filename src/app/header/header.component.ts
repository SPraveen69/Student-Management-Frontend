import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthguardService } from 'src/services/auth/authguard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  @Output() toggleSidebar: EventEmitter<void>= new EventEmitter<void>();

  constructor(private auth: AuthguardService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Method to emit the toggleSidebar event when the button is clicked
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    this.auth.signout();
  }
}
