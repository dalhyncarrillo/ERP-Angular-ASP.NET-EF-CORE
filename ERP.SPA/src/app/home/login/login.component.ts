import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { LanguageService } from '../../_services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emp: any = {};
  constructor(private languageService: LanguageService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login(this.emp).subscribe(
      success=> {
        this.alertify.success('loginSuccess');
    },
      error => {
        this.alertify.error('loginError');
    });
  }

  onFlagClick(lang: string) {
    this.languageService.changeLang(lang);
  }
}
