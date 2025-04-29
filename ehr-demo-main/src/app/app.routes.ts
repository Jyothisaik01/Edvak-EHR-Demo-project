
import { Routes } from '@angular/router';
//import { LoginComponent } from './Components/login/login.component';
//import { UserCreationComponent } from './user-creation/user-creation.component'; 
import { UserCreationComponent } from '../app/Components/user-creation/user-creation.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { authGuard } from './Components/guards/auth.guard';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { PatientRegistrationComponent } from './Components/patient-registration/patient-registration.component';
import { AppointmentFormComponent } from './Components/appointment-form/appointment-form.component';
//import { AppointmentViewComponent } from './Components/appiontment-view/appiontment-view.component';
import { PatientPaginationComponent } from './Components/patient-pagination/patient-pagination.component';
//import { AppiontmentViewComponent } from './Components/appiontment-view/appiontment-view.component';
import { AppointmentViewComponent } from './Components/appointment-view/appointment-view.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { OtpLoginComponent } from './Components/otp-login/otp-login.component';

export const routes: Routes = [  
  
  
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'otp-login', component: OtpLoginComponent },

      {
        
           path: '', redirectTo: 'login', pathMatch: 'full' 
         
      },

      {
        path: 'login',
        component: LoginComponent, // Wraps Login/Register
        
      },
     
      {
        path: 'register',
        component: RegistrationComponent, // Wraps Login/Register
        
      },

    
      { path: 'reset-password', component: ResetPasswordComponent },

      {
        path: 'welcome',
        component: MainLayoutComponent, // Wrapper for sidebar & header
        canActivate: [authGuard], // Protects Dashboard
        children: [
 
          { path: '', component: WelcomeComponent },
          { path: 'user-view', component: PaginationComponent },
          { path: 'user-creation', component: UserCreationComponent },
          {path: 'patient-creation', component:PatientRegistrationComponent},
          {path: 'patient-view', component:PatientPaginationComponent},
          {path: 'appointment-creation', component:AppointmentFormComponent},
          {path: 'appointment-view', component:AppointmentViewComponent}
        ],
      },
      
      { path: '**', redirectTo: 'login' },
     

    
];