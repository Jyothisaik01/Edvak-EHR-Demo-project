import { Component } from '@angular/core';
import { 
  RouterLink, RouterModule} from '@angular/router';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterLink, RouterModule,DrawerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
 

}
