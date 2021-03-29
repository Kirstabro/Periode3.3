namespace SmartmeterPacketApi.Models
{
    public class SmartmeterPacketDatabaseSettings : ISmartmeterPacketDatabaseSettings
    {
        public string SmartmeterPacketsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ISmartmeterPacketDatabaseSettings
    {
        string SmartmeterPacketsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}