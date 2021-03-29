using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using EmonApi.Models;

namespace EmonApi.Services
{
    public class PowerdataService
    {
        private readonly IMongoCollection<Powerdata> _powerdata;

        public PowerdataService(IEmonDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _powerdata = database.GetCollection<Powerdata>(settings.PowerdataCollectionName);
        }

        public List<Powerdata> Get() =>
            _powerdata.Find(powerdata => true).ToList();

        public Powerdata Get(string id) =>
            _powerdata.Find<Powerdata>(powerdata => powerdata.Id == id).FirstOrDefault();

        public Powerdata Create(Powerdata powerdata)
        {
            _powerdata.InsertOne(powerdata);
            return powerdata;
        }

        public void Update(string id, Powerdata powerdataIn) =>
            _powerdata.ReplaceOne(powerdata => powerdata.Id == id, powerdataIn);

        public void Remove(Powerdata powerdataIn) =>
            _powerdata.DeleteOne(powerdata => powerdata.Id == powerdataIn.Id);

        public void Remove(string id) => 
            _powerdata.DeleteOne(powerdata => powerdata.Id == id);
    }
}