import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthguardService } from 'src/services/auth/authguard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  
  @Output() toggleSidebar: EventEmitter<void>= new EventEmitter<void>();

  constructor(private auth: AuthguardService){}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    this.auth.signout();
  }
}
