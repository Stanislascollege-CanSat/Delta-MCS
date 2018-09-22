/*
  Serial response test

  Send message to Delta MCU with Delta software & recieve message as part of the packet.

*/

String incomingString = "";
bool messageComplete = false;

void setup() {
  Serial.begin(9600);
  // reserve 200 bytes for the inputString:
  incomingString.reserve(200);
}

void loop() {
  if (messageComplete) {
    Serial.print("{message:");
    Serial.print(incomingString);
    Serial.print(";}");
    // Clear message.
    incomingString = "";
    messageComplete = false;
  }
}

void serialEvent() {
  while (Serial.available()) {
    // Get incoming message.
    char incoming = (char)Serial.read();
    // Add to string.
    incomingString += incoming;
    // If incoming character is newline than set messageComplete to true.
    if (incoming == '\n') {
      messageComplete = true; 
    }
  }
}

