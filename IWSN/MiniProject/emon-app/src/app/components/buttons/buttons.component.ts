import { Component, OnInit } from '@angular/core';
import { EventhandlerService } from 'src/app/services/eventhandler.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  constructor(
    private eventHandler:EventhandlerService
  ) { }

  ngOnInit(): void {
  }

  hour(){
    this.eventHandler.emitHourEvent();
  }

  day(){
    this.eventHandler.emitDayEvent();
  }

  week(){
    this.eventHandler.emitWeekEvent();
  }


}
