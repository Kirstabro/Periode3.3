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

        public DateTime Date { get; set; }

        public double Actual_electricity_power_delivered_plus {get; set;}

        public double Actual_electicity_power_recieved_min {get; set;}
    }
}