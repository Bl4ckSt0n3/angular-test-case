import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kentkart-angular-test-case';

  enable: boolean = false;
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  constructor( private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if(e.url == "/login" || e.url == "/") {
          this.enable = false;
        }
        else if(e.url == "/userinfo") {
          this.enable = true;
        }
        else{
          this.enable = true;
        }
      }
    });
  }
}
