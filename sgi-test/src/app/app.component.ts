import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sgi-test';
  rla: RouterLinkActive;

  constructor(router: RouterLinkActive) {
    this.rla = router;
  }

  ngOnInit() {
    console.log('router links = ');
    console.log(this.rla);
  }
}
