import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Powerdata, Sensordata } from 'src/app/Datapackets';
import { EmonApiService } from 'src/app/services/emon-api.service';

@Component({
  selector: 'app-currentdata',
  templateUrl: './currentdata.component.html',
  styleUrls: ['./currentdata.component.css']
})
export class CurrentdataComponent implements OnInit {

  currentPower: Powerdata =
  {
    id: "",
    mqttUser : "",
    time : 0,
    actual_electricity_power_delivered_plus : "",
    actual_electricity_power_received_min : "",
  };

  currentSensor: Sensordata =
  {
    id: "",
    mqttUser : "",
    time : 0,
    temperature : 0,
    humidity : 0
  };

  currentDate : string = "";
  currentTime : string = "";
  currentTemp? : number;
  currentHum?  : number;

  constructor(
    private httpHelper: EmonApiService
  ) { }

  ngOnInit(): void {
    this.getLastData();
  }

  getLastData()
  {
    this.httpHelper.getLastPowerdata().subscribe(data => 
    {
      this.currentPower = data[0];
      this.updateDate();
      console.log(this.currentPower.time);
      this.getLastSensorData();
    });
  }

  getLastSensorData(){
    console.log(this.currentPower.time);
    this.httpHelper.getLastSensordata().subscribe(data =>
      {
        if (data.length){
          this.currentSensor = data[0];
          this.currentTemp = this.currentSensor.temperature;
          this.currentHum = this.currentSensor.humidity;
        } else {this.updateSensor();}
      });
  }

  updateSensor(){
    this.currentTemp = 0;
    this.currentHum = 0;
  }

  updateDate(){
    let startHourDate : Date = new Date();
    startHourDate.setTime(this.currentPower.time*1000);
    this.currentDate = startHourDate.toDateString().toString();
    this.currentTime = startHourDate.toLocaleTimeString().toString();
  }
}
