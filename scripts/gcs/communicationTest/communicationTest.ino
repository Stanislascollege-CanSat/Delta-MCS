/*
  @author JSSRDRG
  GCS communicationTest

*/

// Inlude libraries
#include <SPI.h>
#include <RH_RF95.h>

// Define pin connections
#define RF_CS 4
#define RF_RST 2
#define RF_IRQ 3 // Must be hardware interrupt

// Define variable.
#define RF_FREQ 868.0 // Change after decimal for channels

// Create Singleton instances
RH_RF95 RF(RF_CS, RF_IRQ);

void setup() {
  // Start RFM95W
  pinMode(RF_RST, OUTPUT);
  digitalWrite(RF_RST, HIGH);

  // Initialize the serial connection.
   while (!Serial);
  Serial.begin(115200);
  delay(50);

  Serial.print("{ST:SR2;LG:GCS is in startup;}");

  // RFM95W reset
  digitalWrite(RF_RST, LOW);
  delay(10);
  digitalWrite(RF_RST, HIGH);
  delay(10);

  // Check if the RFM95W has intialized.
  if (RF.init()) {
    Serial.print("{ST:RF2;}");
  } else {
    Serial.print("{ST:RF0;}");
  }

  // Defaults after init are 434.0MHz, 13dBm, Bw = 125 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on
  // Set RFM95W frequency
  if (RF.setFrequency(RF_FREQ)) {
    Serial.print("{ST:FR2;LG:Frequency set to: "); Serial.print(RF_FREQ); Serial.print("MHz;}");
  } else {
    Serial.print("{ST:FR0;}");
  }

   // Set TX transmission power.
   RF.setTxPower(23, false);
   Serial.print("{ST:TP2;}");
}

void loop() {
  Serial.print("{HG:");
  Serial.print(rand() % 50);
  Serial.print(";RS:-");
  Serial.print(rand() % 100);
  Serial.print(";}");
  delay(100);

}
