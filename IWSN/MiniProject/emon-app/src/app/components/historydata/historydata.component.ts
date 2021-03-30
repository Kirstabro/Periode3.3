import { Component, OnInit } from '@angular/core';
import { Powerdata, Sensordata } from 'src/app/Datapackets';
import { EmonApiService } from 'src/app/services/emon-api.service';
import { GraphHelperService } from 'src/app/services/graph-helper.service';
import { EventhandlerService } from 'src/app/services/eventhandler.service';
import { Timespan } from 'src/app/enum';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-historydata',
  templateUrl: './historydata.component.html',
  styleUrls: ['./historydata.component.css']
})
export class HistorydataComponent implements OnInit {

  sensors: Sensordata[] = [];
  powerdata: Powerdata[] = [];
  costtotal: number = 0;

  constructor(
    private httpService: EmonApiService,
    private graphHelper: GraphHelperService,
    private eventhelper: EventhandlerService
  ) { }

  //#region ChartSettings
  lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'temperature'
    },
    {
      data: [],
      label: 'Humidity'
    }];

  lineChartLabels: Label[] = [];

  lineChartData2: ChartDataSets[] = [
    {
      data: [],
      label: 'Power_in'
    },
    {
      data: [],
      label: 'Power_out'
    }];

  lineChartLabels2: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
  //#endregion

  ngOnInit() {
    this.httpService.getSensordata()
      .subscribe(data => {
        this.sensors = data as Sensordata[];
        console.log(this.sensors);
      });
    this.httpService.getPowerdata()
      .subscribe(data => {
        this.powerdata = data as Powerdata[];
        console.log(this.powerdata);
      });

      this.updateChart();

    this.eventhelper.$hour.subscribe(data => {
      this.setSensorChartTime(Timespan.Hour);
      this.setPowerChartTime(Timespan.Hour);
    });
    this.eventhelper.$day.subscribe(data => {
      this.setSensorChartTime(Timespan.Day);
      this.setPowerChartTime(Timespan.Day);
    });
    this.eventhelper.$week.subscribe(data => {
      this.setSensorChartTime(Timespan.Week);
      this.setPowerChartTime(Timespan.Week);
    });

  }

  calculateCosts() {
    let temp: number = 0;
    //0,22 per kwh
    this.powerdata.map(data => {
      let substring: string = data.actual_electricity_power_received_min;
      substring = substring.substr(0, substring.length - 3);
      temp += +((parseFloat(substring) / 180) * 0.22);
    });

    this.costtotal = temp;
  }

  getSensor(): void {
    this.httpService.getSensordata()
      .subscribe(data => {
        this.sensors = data as Sensordata[];
      });
  }

  getPowerdata(): void {
    this.httpService.getPowerdata().
      subscribe(data => {
        this.powerdata = data as Powerdata[];
        console.log(this.powerdata);
      });
  }

  setSensorChartTime(time: Timespan) {
    console.log("EVENT:", time)
    let last: Sensordata = this.sensors[this.sensors.length - 1];
    let temp: Sensordata[] = [];
    console.log("Last:", last);
    this.sensors.map(data => {
      if (data.time > last.time - time) {
        temp.push(data);
      }
    });

    console.log("temp", temp);
    this.lineChartData = [
      {
        data: this.graphHelper.getTemps(temp),
        label: 'temperature'
      },
      {
        data: this.graphHelper.getHums(temp),
        label: 'humidity'
      }];

    this.lineChartLabels = this.graphHelper.getLabels(temp);

    this.calculateCosts();
  }

  setPowerChartTime(time: Timespan) {
    console.log("POWER EVENT:", time)
    let last: Powerdata = this.powerdata[this.powerdata.length - 1];
    let temp: Powerdata[] = [];
    console.log("Last:", last);
    this.powerdata.map(data => {
      if (data.time > last.time - time) {
        temp.push(data);
      }
    });

    console.log("temp", temp);
    this.lineChartData2 = [
      {
        data: this.graphHelper.getIn(temp),
        label: 'Generated'
      },
      {
        data: this.graphHelper.getOut(temp),
        label: 'Used'
      }];

    this.lineChartLabels2 = this.graphHelper.getLabels2(temp);

    this.calculateCosts();
  }

  updateChart() {
    this.lineChartData = [
      {
        data: this.graphHelper.getTemps(this.sensors),
        label: 'temperature'
      },
      {
        data: this.graphHelper.getHums(this.sensors),
        label: 'humidity'
      }];

    this.lineChartLabels = this.graphHelper.getLabels(this.sensors);

    this.lineChartData2 = [
      {
        data: this.graphHelper.getIn(this.powerdata),
        label: 'Generated'
      },
      {
        data: this.graphHelper.getOut(this.powerdata),
        label: 'Used'
      }];

    this.lineChartLabels2 = this.graphHelper.getLabels2(this.powerdata);

    this.calculateCosts();

  }


}
