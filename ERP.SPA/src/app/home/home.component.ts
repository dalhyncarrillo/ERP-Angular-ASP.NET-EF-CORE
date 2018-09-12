import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isFirstLogin() {
    return localStorage.getItem('isFirstLogin') == 'true' ? true : false;
  }
  loggedIn() {
    return this.authService.isLoggedIn();
  }

}
