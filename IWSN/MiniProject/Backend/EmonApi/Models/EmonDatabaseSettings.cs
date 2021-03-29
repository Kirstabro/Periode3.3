namespace EmonApi.Models
{
    public class EmonDatabaseSettings : IEmonDatabaseSettings
    {
        public string SmartmeterPacketsCollectionName { get; set; }
        public string PowerdataCollectionName {get ; set;}
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IEmonDatabaseSettings
    {
        string SmartmeterPacketsCollectionName { get; set; }
        string PowerdataCollectionName {get ; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}