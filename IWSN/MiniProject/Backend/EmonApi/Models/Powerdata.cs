using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace EmonApi.Models
{
    public class Powerdata
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("MQTT_USER")]
        public string MqttUser {get; set;}
        public int Time { get; set; }
        public string Actual_electricity_power_delivered_plus {get; set;}
        public string Actual_electricity_power_received_min {get; set;}
        
    }
}