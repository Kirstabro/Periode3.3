using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using EmonApi.Models;

namespace EmonApi.Services
{
    public class SmartmeterPacketService
    {
        private readonly IMongoCollection<SmartmeterPacket> _smartmeterPackets;

        public SmartmeterPacketService(IEmonDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _smartmeterPackets = database.GetCollection<SmartmeterPacket>(settings.SmartmeterPacketsCollectionName);
        }

        public List<SmartmeterPacket> Get() =>
            _smartmeterPackets.Find(smartmeterPacket => true).ToList();

        public SmartmeterPacket Get(string id) =>
            _smartmeterPackets.Find<SmartmeterPacket>(smartmeterPacket => smartmeterPacket.Id == id).FirstOrDefault();

        public SmartmeterPacket Create(SmartmeterPacket smartmeterPacket)
        {
            _smartmeterPackets.InsertOne(smartmeterPacket);
            return smartmeterPacket;
        }

        public void Update(string id, SmartmeterPacket smartmeterPacketIn) =>
            _smartmeterPackets.ReplaceOne(smartmeterPacket => smartmeterPacket.Id == id, smartmeterPacketIn);

        public void Remove(SmartmeterPacket smartmeterPacketIn) =>
            _smartmeterPackets.DeleteOne(smartmeterPacket => smartmeterPacket.Id == smartmeterPacketIn.Id);

        public void Remove(string id) => 
            _smartmeterPackets.DeleteOne(smartmeterPacket => smartmeterPacket.Id == id);
    }
}