export interface Powerdata {
    id: string,
    mqttUser : string,
    time : number,
    actual_electricity_power_delivered_plus : string,
    actual_electricity_power_received_min : string;
}

export interface Sensordata {
    id: string,
    mqttUser : string,
    time : number,
    temperature : number,
    humidity : number;
}

export interface SmartmeterPacket{
 
}