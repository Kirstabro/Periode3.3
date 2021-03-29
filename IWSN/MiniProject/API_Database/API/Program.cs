using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MQTTnet;
using MQTTnet.Client.Options;
using MQTTnet.Client;
using MQTTnet.Server;
using MQTTnet.Client.Receiving;
using System.Threading;


namespace SmartmeterPacketApi
{
    public class Program
    {

        
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            
            //implement MQTT
            var factory = new MqttFactory();
            var mqttClient = factory.CreateMqttClient();

            // Use TCP connection.
            var options = new MqttClientOptionsBuilder()
                .WithTcpServer("test.mosquitto.org", 1883) // Port is optional
                .Build();

            mqttClient.ConnectAsync(options, CancellationToken.None); // Since 3.0.5 with CancellationToken

            mqttClient.SubscribeAsync(new MqttTopicFilterBuilder().WithTopic("SMARTMETER-BANO-KRUSTY-DATA").Build());

            
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
