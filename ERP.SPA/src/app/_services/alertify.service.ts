import { Injectable } from '@angular/core';
//var alertify = require('alertifyjs');
declare let alertify: any;

@Injectable()
export class AlertifyService {

constructor() { }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }  
}
