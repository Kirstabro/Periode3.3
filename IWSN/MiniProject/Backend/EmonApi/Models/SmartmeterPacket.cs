using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace EmonApi.Models
{
    public class SmartmeterPacket
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

         [BsonElement("MQTT_USER")]
        public string MqttUser {get; set;}
        public string Equipment_id { get; set;}
        public int Time { get; set; }

        public string P1_output_version_information {get ; set; }

        public double MeterReadingToClientTariff1 { get; set; }

        public double MeterReadingToClientTariff2 { get; set; }

        public double MeterReadingByClientTariff1 { get; set; }

        public double MeterReadingByClientTariff2 { get; set; }

        public string ActiveTariff { get; set; }

        public double ActualDeliveredElectricity { get; set; }

        public double ActualReceivedElectricity { get; set; }

        public double GasmeterRegister { get; set; }

    }
}
