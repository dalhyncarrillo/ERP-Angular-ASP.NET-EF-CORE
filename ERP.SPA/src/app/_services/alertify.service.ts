import { Injectable } from '@angular/core';
var alertify: any;

@Injectable()
export class AlertifyService {

constructor() { }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.console.error(message);
  }
}
