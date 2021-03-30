import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Powerdata, Sensordata } from 'src/app/Datapackets';
import { EmonApiService } from 'src/app/services/emon-api.service';
import { GraphHelperService } from 'src/app/services/graph-helper.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-historydata',
  templateUrl: './historydata.component.html',
  styleUrls: ['./historydata.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class HistorydataComponent implements OnInit {

  sensors: Sensordata[] = [];
  powerdata: Powerdata[] = [];

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

    lineChartLabels : Label[] = [];

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
    lineChartType  : ChartType = 'line';
    //#endregion

  ngOnInit(){
    this.httpService.getSensordata()
        .subscribe(data => {
          this.sensors = data as Sensordata[];
          console.log(this.sensors);
          this.updateChart();
        });
  }

  constructor(
    private httpService: EmonApiService,
    private graphHelper : GraphHelperService
  ) { }

  getSensor(): void {
    this.httpService.getSensordata()
        .subscribe(data => {
          this.sensors = data as Sensordata[];
          console.log(this.sensors);
        });
  }

  updateChart()
  {
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
  }

  getPowerdata(): void 
  {
    this.httpService.getPowerdata().subscribe(data => {
      this.powerdata = data as Powerdata[];
      console.log(this.powerdata);
    });
  }
}
