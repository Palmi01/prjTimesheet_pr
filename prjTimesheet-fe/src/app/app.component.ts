import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {prjTimesheetEntitiesComponent} from './component/prjTimesheet-entities/prjTimesheet-entities.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
