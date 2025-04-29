import { Component } from '@angular/core';
import { 
  RouterLink, RouterModule} from '@angular/router';

  import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  imports: [  RouterModule,PanelMenu],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {


  menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/welcome',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'Users',
      icon: 'pi pi-user',
      items: [
        {
          label: 'User Creation',
          icon: 'pi pi-user-plus',
          routerLink: '/welcome/user-creation',
        },
        {
          label: 'View Users',
          icon: 'pi pi-eye',
          routerLink: '/welcome/user-view',
        }
      ]
    },
    {
      label: 'Patients',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Patient Creation',
          icon: 'pi pi-user-plus',
          routerLink: '/welcome/patient-creation',
        },
        {
          label: 'Patient View',
          icon: 'pi pi-eye',
          routerLink: '/welcome/patient-view',
        }
      ]
    },
    {
      label: 'Appointments',
      icon: 'pi pi-calendar',
      items: [
        {
          label: 'Create Appointment',
          icon: 'pi pi-plus',
          routerLink: '/welcome/appointment-creation',
        },
        {
          label: 'View Appointments',
          icon: 'pi pi-eye',
          routerLink: '/welcome/appointment-view',
        }
      ]
    }
  ];

 

}
