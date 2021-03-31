import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventhandlerService {
  $hour = new EventEmitter();
  $day = new EventEmitter();
  $week = new EventEmitter();

  constructor() { }

  emitHourEvent(){
    this.$hour.emit();
  }

  emitDayEvent(){
    this.$day.emit();
  }

  emitWeekEvent(){
    this.$week.emit();
  }

}
