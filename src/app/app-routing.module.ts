import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentHubComponent } from './student-hub/student-hub.component';
import { LayoutComponent } from './layout/layout.component';
import { GuardService } from './guard/guard.service';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'', 
    component: LayoutComponent,
    canActivate: [GuardService],
    children: [
      {path: 'studenthub', component: StudentHubComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
