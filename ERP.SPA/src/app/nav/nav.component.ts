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

  DEFAULT_LANGUAGE = 'en'
  currentLang = this.DEFAULT_LANGUAGE;

  constructor(private translate: TranslateService, private router: Router, private authService: AuthService) { 
    translate.addLangs(['en', 'hu']);
    translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    translate.use(this.DEFAULT_LANGUAGE);
  }

  changeLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
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
