using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using EmonApi.Models;

namespace EmonApi.Services
{
    public class SensordataService
    {
        private readonly IMongoCollection<Sensordata> _sensordata;

        public SensordataService(IEmonDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _sensordata = database.GetCollection<Sensordata>(settings.SensordataCollectionName);
        }

        public List<Sensordata> Get() =>
            _sensordata.Find(sensordata => true).ToList();

        public Sensordata Get(string id) =>
            _sensordata.Find<Sensordata>(sensordata => sensordata.Id == id).FirstOrDefault();

        public List<Sensordata> GetLast() =>
            _sensordata.Find<Sensordata>(data => true)
                        .SortByDescending(data => data.Time)
                        .Limit(1)
                        .ToList();

        public Sensordata Create(Sensordata sensordata)
        {
            _sensordata.InsertOne(sensordata);
            return sensordata;
        }

        public void Update(string id, Sensordata sensordataIn) =>
            _sensordata.ReplaceOne(sensordata => sensordata.Id == id, sensordataIn);

        public void Remove(Sensordata sensordataIn) =>
            _sensordata.DeleteOne(sensordata => sensordata.Id == sensordataIn.Id);

        public void Remove(string id) => 
            _sensordata.DeleteOne(sensordata => sensordata.Id == id);
    }
}