#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <XBee.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <Udp.h>
#include <WiFiClient.h>
#include <WiFiManager.h>


WiFiClient client;
PubSubClient mqtt;
XBee xbee = XBee();

DynamicJsonDocument doc(1024);
DynamicJsonDocument doc2(1024);
char output[2048];
WiFiUDP udp;
NTPClient ntp(udp, "pool.ntp.org", 3600);

SoftwareSerial ss(TX, RX);

XBeeResponse response = XBeeResponse();
// create reusable response objects for responses we expect to handle 
ZBRxResponse rx = ZBRxResponse();
ModemStatusResponse msr = ModemStatusResponse();

String incoming = "";

constexpr char MQTT_SERVER[] = "test.mosquitto.org";
constexpr int MQTT_PORT = 1883;
void connectMQTT(){
  while(!mqtt.connected()){
    
    mqtt.connect("iwsn-wemos-client-Bano");
    delay(100);
    if(mqtt.connected()){
      Serial.println("MQTT Connected");
      mqtt.publish("SMARTMETER-BANO-KRUSTY-LOGIN", "Wemos Connected! HOI");
      break;
    }
    
  }
}

void setup() {
  Serial.begin(9600);
  ss.begin(9600);
  xbee.begin(ss);

  ntp.begin();
  ntp.forceUpdate();
  delay(5000);
  
  WiFi.begin("Calinda", "33229511726109201988"); // Connect to the Wi-Fi (if not known use WifiManager from tzapu!)
  Serial.print("Setup Wi-Fi:");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  WiFi.setAutoReconnect(true);
  WiFi.persistent(true);
  Serial.println();
  Serial.print("Connected:");
  Serial.println(WiFi.localIP());

  mqtt.setClient(client);  // Setup the MQTT client
  mqtt.setBufferSize(256); // override MQTT_MAX_PACKET_SIZE
  mqtt.setServer(MQTT_SERVER, MQTT_PORT);
  connectMQTT();

  
}

void loop() {


if (!mqtt.connected())
{
  connectMQTT();
}

  xbee.readPacket();

    if (xbee.getResponse().isAvailable()) {
      // got something
      //mqtt.publish("SENSORDATA-BANO-KRUSTY-DATA","HELLO CHIEM2");
      if (xbee.getResponse().getApiId() == ZB_RX_RESPONSE) {
        // got a zb rx packet
        
        // now fill our zb rx class
        xbee.getResponse().getZBRxResponse(rx);
            
        uint8_t* test = rx.getFrameData();
        int test2 = rx.getFrameDataLength();
        String message = "";
        for (int i = 11; i < test2; i++) {
          //message.setCharAt(i, (char)test);
          message += (char)test[i];
          //Serial.println((char)test[i]);
        }
        deserializeJson(doc2, message.c_str());
       
        JsonObject obj = doc.to<JsonObject>();
        obj["MQTT_USER"] = "SENSORDATA-BANO";
        obj["Time"] = ntp.getEpochTime();
        //Serial.println(message.c_str());
        
        obj["Temperature"] = doc2["Temperature"];
        obj["Humidity"] = doc2["Humidity"];

        serializeJson(obj, output);
        mqtt.publish("SENSORDATA-BANO-KRUSTY-DATA", output);

      } else if (xbee.getResponse().getApiId() == MODEM_STATUS_RESPONSE) {
        xbee.getResponse().getModemStatusResponse(msr);
        // the local XBee sends this response on certain events, like association/dissociation
        
        if (msr.getStatus() == ASSOCIATED) {
          // yay this is great.  flash led
          //Serial.println(incoming = rx.getData(0));
          // incoming = rx.getData(0);
          // mqtt.publish("Bano", incoming.c_str());
         
        } else if (msr.getStatus() == DISASSOCIATED) {
          // this is awful.. flash led to show our discontent
        
        } else {
          // another status
   
        }
      } else {
      	// not something we were expecting
       
      }
    } else if (xbee.getResponse().isError()) {
      //nss.print("Error reading packet.  Error code: ");  
      //nss.println(xbee.getResponse().getErrorCode());
    }
    
}