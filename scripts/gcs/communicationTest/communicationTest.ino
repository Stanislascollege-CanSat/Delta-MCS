/*
  @author JSSRDRG
  GCS communicationTest

*/

// Inlude libraries
#include <SPI.h>
#include <Wire.h>
#include <RH_RF95.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>

// Define pin connections
#define RF_CS 4
#define RF_RST 2
#define RF_IRQ 3 // Must be hardware interrupt

// Define variable.
#define RF_FREQ 868.0 // Change after decimal for channels

// Create Singleton instances
RH_RF95 RF(RF_CS, RF_IRQ);
Adafruit_BMP280 bme;

void setup() {
  // Start RFM95W
  pinMode(RF_RST, OUTPUT);
  digitalWrite(RF_RST, HIGH);

  // Initialize the serial connection.
  while (!Serial);
  Serial.begin(115200);
  delay(200);

  Serial.print("{STS:2;LG:GCS is in startup;}");

  // RFM95W reset
  digitalWrite(RF_RST, LOW);
  delay(10);
  digitalWrite(RF_RST, HIGH);
  delay(10);

  // Check if the RFM95W has intialized.
  if (RF.init()) {
    Serial.print("{STR:2;}");
  } else {
    Serial.print("{STR:0;}");
  }

  // Defaults after init are 434.0MHz, 13dBm, Bw = 125 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on
  // Set RFM95W frequency
  if (RF.setFrequency(RF_FREQ)) {
    Serial.print("{STF:2;LG:Frequency set to: "); Serial.print(RF_FREQ); Serial.print("MHz;}");
  } else {
    Serial.print("{STF:0;}");
  }

   // Set TX transmission power.
   RF.setTxPower(23, false);
   Serial.print("{STP:2;}");

   // Check if the BMP280 has intialized.
   if (bme.begin(0x76)) {
    Serial.print("{STB:2;}");
   } else {
    Serial.print("{STB:0;}");
   }
}

void loop() {
  Serial.print("{HG:");
  Serial.print(rand() % 50);
  Serial.print(";RS:-");
  Serial.print(rand() % 100);
  Serial.print(";AP:");
  Serial.print(bme.readPressure());
  Serial.print(";AT:");
  Serial.print(bme.readTemperature());
  Serial.print(";}");
  delay(100);

}
