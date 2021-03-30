import { Injectable } from '@angular/core';
import { Powerdata, Sensordata } from '../Datapackets';
import { Timespan } from '../enum';

@Injectable({
  providedIn: 'root'
})
export class GraphHelperService {

  constructor() { }

  maxDatapoints = 150;

  getLabels(sensors: Sensordata[]): string[]
  {
    let labels: string[] = [];
    let maxPoints: number = 100;
    sensors.map(data =>
      {
        let startHourDate : Date = new Date();
            startHourDate.setTime(data.time * 1000);
            labels.push(startHourDate.toLocaleTimeString());
      });

    if (labels.length > maxPoints)
    {
      labels = labels.filter((data, index) =>
      {
        if (index % Math.floor(sensors.length / maxPoints) == 0){
          return data;
        } else {return;}
      });
    }
    return labels;

    
  }

  getHums(sensors: Sensordata[]): number[]
  {
    let humidities: number[] = [];
    let maxPoints: number = 100;

    sensors.map(data =>
      humidities.push(data.humidity));

    if (humidities.length > maxPoints)
    {
      humidities = humidities.filter((data, index) =>
      {
        if (index % Math.floor(sensors.length / maxPoints) == 0){
          return data;
        } else {return;}
      });
    }
    return humidities;
  }

  getTemps(sensors: Sensordata[]): number[]
  {
    let temperatures: number[] = [];
    let maxPoints: number = 100;

    sensors.map(data =>
      temperatures.push(data.temperature));

      if (temperatures.length > maxPoints)
      {
        temperatures = temperatures.filter((data, index) =>
        {
          if (index % Math.floor(sensors.length / maxPoints) == 0){
            return data;
          } else {return;}
        });
      }
    return temperatures;
  }

  getLabels2(powerdata: Powerdata[]): string[]
  {
    let labels: string[] = [];
    let maxPoints: number = 100;
    powerdata.map(data =>
      {
        let startHourDate : Date = new Date();
            startHourDate.setTime(data.time * 1000);
            labels.push(startHourDate.toLocaleTimeString());
      });

    if (labels.length > maxPoints)
    {
      labels = labels.filter((data, index) =>
      {
        if (index % Math.floor(powerdata.length / maxPoints) == 0){
          return data;
        } else {return;}
      });
    }
    return labels;
  }

  getOut(powerdata: Powerdata[]): number[]
  {
    let received: number[] = [];
    let maxPoints: number = 100;

    powerdata.map(data =>
      {
        let power : number = 0;
        let substring : string = data.actual_electricity_power_received_min;
          substring = substring.substr(0, substring.length-3);
          power = parseFloat(substring);
          received.push(power);
      })

    if (received.length > maxPoints)
    {
      received = received.filter((data, index) =>
      {
        if (index % Math.floor(powerdata.length / maxPoints) == 0){
          return data;
        } else {return;}
      });
    }
    console.log("RECEIVED: ", received);

    return received;
  }

  getIn(powerdata: Powerdata[]): number[]
  {
    let delivered: number[] = [];
    let maxPoints: number = 100;

    powerdata.map(data =>
      {
        let power : number = 0;
        let substring : string = data.actual_electricity_power_delivered_plus;
          substring = substring.substr(0, substring.length-3);
          power = parseFloat(substring);
        delivered.push(power);
      })

      if (delivered.length > maxPoints)
      {
        delivered = delivered.filter((data, index) =>
        {
          if (index % Math.floor(powerdata.length / maxPoints) == 0){
            return data;
          } else {return;}
        });
      }
      console.log("DELIVERED: ", delivered);
    return delivered;
  }
}
