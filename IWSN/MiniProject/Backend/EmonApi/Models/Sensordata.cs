using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EmonApi.Models
{
    public class Sensordata
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("MQTT_USER")]
        public string MqttUser {get; set;}
        public int Time { get; set; }
        public int Temperature {get; set;}
        public int Humidity {get; set;}
    }
}