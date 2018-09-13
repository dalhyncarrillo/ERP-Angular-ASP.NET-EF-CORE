import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  statuses = ['Active', 'Inactive'];
  constructor() { }

  getStatuses() {
    return this.statuses;
  }
}
