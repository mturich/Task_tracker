import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  subscription: Subscription;

  // Services have to added to the constructer
  constructor(private uiService: UiService, private router:Router ) {
    this.subscription = this.uiService.onToggle().subscribe(
      (value) => (this.showAddTask = value)
    );
  }
  ngOnInit(): void {}

  toggleAddTask() {
    // calls the serviceUI
    //this.showAddTask = !this.showAddTask
    this.uiService.toToggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url === route;
}

}
