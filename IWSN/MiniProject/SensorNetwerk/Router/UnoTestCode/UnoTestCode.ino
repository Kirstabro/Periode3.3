#include <dht.h>
#include <ArduinoJson.h>

#include <XBee.h>
XBee xbee = XBee();

dht DHT;

#define DHT11_PIN 7

DynamicJsonDocument doc(40);
char output[40];

//uint8_t payload[40];

String message;

XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x41930C5B);
ZBTxRequest zbTx = ZBTxRequest(addr64, output, sizeof(output));
ZBTxStatusResponse txStatus = ZBTxStatusResponse();

void setup() {
  Serial.begin(9600);
  xbee.setSerial(Serial);
}
void loop() {
  // Clean payload
  //memset(payload, 0, sizeof(payload));
  
  // Read DHT pin
  int chk = DHT.read11(DHT11_PIN);


  JsonObject obj = doc.to<JsonObject>();
  obj["Temperature"] = DHT.temperature;
  obj["Humidity"] = DHT.humidity;
  serializeJson(obj, output);
  
//  // Place all readings in 1 string 
//  //Serial.print("Temperature = ");
//  //Serial.println(DHT.temperature);
//  message = message + "Temperature(";
//  message = message + DHT.temperature;
//  message = message + ")\r\n";
//  //Serial.print("Humidity = ");
//  //Serial.println(DHT.humidity);
//  message = message + "Humidity(";
//  message = message + DHT.humidity;
//  message = message + ")\r\n";

//  Serial.println(message);

// //Convert string to payload[]
//  for (int i = 0; i < obj.length(); i++) {
//   payload[i] = ojb[i];
//  }

  //message = "";

// payload[0] = 0x74;
  
  xbee.send(zbTx);
  if (xbee.readPacket(5000)) {
    // got a response!
  
    // should be a znet tx status              
    if (xbee.getResponse().getApiId() == ZB_TX_STATUS_RESPONSE) {
      xbee.getResponse().getZBTxStatusResponse(txStatus);

      // get the delivery status, the fifth byte
      if (txStatus.getDeliveryStatus() == SUCCESS) {
        // success.  time to celebrate
        Serial.println("Succesfully received");
      } else {
        // the remote XBee did not receive our packet. is it powered on?
        Serial.println("Not received");
      }
    }
  } else if (xbee.getResponse().isError()) {
    //nss.print("Error reading packet.  Error code: "); 
    //nss.println(xbee.getResponse().getErrorCode());
    Serial.println("Error1");
  } else {
    // local XBee did not provide a timely TX Status Response -- should not happen
    Serial.println("Error2");
  }

  delay(10000);
}
