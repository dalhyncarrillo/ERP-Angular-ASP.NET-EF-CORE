import { LanguageService } from './../_services/language.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private languageService: LanguageService, private router: Router, private authService: AuthService) { }

  changeLang(lang: string) {
    this.languageService.changeLang(lang);
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }
}
