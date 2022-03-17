import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ShowUsersComponent } from './show-users/show-users.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthGuardService]
})
export class LoginComponent implements OnInit {

  auth2: any;

  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private dbService: NgxIndexedDBService,
    private modalService: NgbModal,
  ) { }

  navigateTo(url: any) {
    this.router.navigate([url]);
  }
  showUsers() {
    this.modalService.open(ShowUsersComponent, { size: 'lg'});
  }
  callLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},

      (googleAuthUser:any) => {
        // let profile = googleAuthUser.getBasicProfile();
        // console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
       /* Write Your Code Here */
        const token = googleAuthUser.getAuthResponse().id_token;
        localStorage.setItem('token', token);
        this.ngZone.run(()=>this.navigateTo('/userinfo'));
        
      }, (error:any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '1062988766819-638k0vfifrkcumbm2edn25oe7mvj0h1p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLoginButton();
      });
    }
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); 
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  ngOnInit(): void {
    this.googleAuthSDK();
    // this.dbService.deleteDatabase().subscribe((deleted) => {
    //   console.log('Database deleted successfully: ', deleted);
    // });
  }

}
