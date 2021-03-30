import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of } from 'rxjs'; 
import { Powerdata, Sensordata } from '../Datapackets'

import {catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmonApiService {

  readonly api_url = "https://localhost:5001/";

  readonly power_url = 'api/Powerdata';
  readonly sensor_url = 'api/Sensordata';
  readonly smartmeter_url = 'api/SmartmeterPackets';

  constructor(
    private http: HttpClient  ) 
  {}

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  /* GET: return all powerdata */
  getPowerdata(): Observable<Powerdata[]> {
    console.log("Get Powerdata");
    return this.http.get<Powerdata[]>(this.api_url + this.power_url).pipe(
      catchError(this.handleError<Powerdata[]>('getPowerdata', []))
    );
  }

  /* GET: return all sensordata */
  getSensordata(): Observable<Sensordata[]> {
    console.log("Get Sensordata");
    console.log(this.api_url + this.sensor_url);
    return this.http.get<Sensordata[]>(this.api_url + this.sensor_url).pipe(
      catchError(this.handleError<Sensordata[]>('getSensordata', []))
    );
  }  

  /* GET: return all powerdata */
  getLastPowerdata(): Observable<Powerdata[]> {
    console.log("Get Last Powerdata");
    return this.http.get<Powerdata[]>(this.api_url + this.power_url + "/last").pipe(
      catchError(this.handleError<Powerdata[]>('getLastPowerdata', []))
    );
  }

    /* GET: return all sensordata */
    getLastSensordata(): Observable<Sensordata[]> {
      console.log("Get Last Sensordata");
      return this.http.get<Sensordata[]>(this.api_url + this.sensor_url + "/last").pipe(
        catchError(this.handleError<any[]>('getLastSensordata', []))
      );
    }  

  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
