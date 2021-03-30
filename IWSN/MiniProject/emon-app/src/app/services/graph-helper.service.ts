import { Injectable } from '@angular/core';
import { Sensordata } from '../Datapackets';

@Injectable({
  providedIn: 'root'
})
export class GraphHelperService {

  constructor() { }

  maxDatapoints = 30;

  getLabels(sensors: Sensordata[]): string[]
  {
    let labels: string[] = [];
    sensors.map(data =>
      {
        let startHourDate : Date = new Date();
            startHourDate.setTime(data.time * 1000);
            labels.push(startHourDate.toLocaleTimeString());
      });

    if (labels.length > this.maxDatapoints)
    {
      labels = labels.filter((data, index) =>
      {
        if (index % Math.floor(labels.length / this.maxDatapoints) == 0){
          return data;
        } else {return;}
      });
    }
    return labels;
  }

  getHums(sensors: Sensordata[]): number[]
  {
    let humidities: number[] = [];
    sensors.map(data =>
      humidities.push(data.humidity));

    if (humidities.length > this.maxDatapoints)
    {
      humidities = humidities.filter((data, index) =>
      {
        if (index % Math.floor(humidities.length / this.maxDatapoints) == 0){
          return data;
        } else {return;}
      });
    }
    return humidities;
  }


  getTemps(sensors: Sensordata[]): number[]
  {
    let temperatures: number[] = [];
    sensors.map(data =>
      temperatures.push(data.temperature));

    if (temperatures.length > this.maxDatapoints)
    {
      temperatures = temperatures.filter((data, index) =>
      {
        if (index % Math.floor(temperatures.length / this.maxDatapoints) == 0){
          return data;
        } else {return;}
      });
    }
    return temperatures;
  }

}
