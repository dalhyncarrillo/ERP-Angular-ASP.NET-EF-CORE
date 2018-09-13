import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
//var alertify = require('alertifyjs');
declare let alertify: any;

@Injectable()
export class AlertifyService {

constructor(private languageService: LanguageService) { }

  success(message: string) {
    this.languageService.getNotifyMessage(message).subscribe(res => {
      alertify.success(res);
    })

  }

  error(message: string) {
    this.languageService.getNotifyMessage(message).subscribe(res => {
      alertify.error(res);
    })
  }  
}
