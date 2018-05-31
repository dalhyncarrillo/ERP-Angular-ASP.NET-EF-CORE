import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emp: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  public login() {
    this.authService.login(this.emp).subscribe(data => {
      console.log(data);
    });
  }

}
