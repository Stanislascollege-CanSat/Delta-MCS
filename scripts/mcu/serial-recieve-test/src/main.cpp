#include <Arduino.h>

int x = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.print("{GPS:");
  Serial.print(x);
  Serial.print(";AcX:12,33;AcY:");
  Serial.print(rand() % 5);
  Serial.print(";}");
  x += 1;
  delay(200);
}
