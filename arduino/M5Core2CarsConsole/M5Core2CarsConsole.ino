/**
* the console of the cars game (processing).
* Steering of the car is achieved via the MPU6886 3-axis controller.
* Try verging the console to the right/left and back/forward.
**/

#include <ArduinoWebsockets.h>  // https://github.com/gilmaimon/ArduinoWebsockets
#include <M5Core2.h>
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>

#define WLAN_SSID "Domos Zweites Funknetz"
#define WLAN_PASSWORD "wirsindamende"
#define PORT 80
#define MAX_RETRIES 15
#define ONE_SECOND 1000

using namespace websockets;

WiFiMulti wifiMulti;
WebsocketsServer server;

bool done = false;

float pitch = 0.0F;
float roll = 0.0F;
float yaw = 0.0F;

void setup() {
  M5.begin();
  M5.Axp.SetLed(0);
  M5.IMU.Init();

  M5.Lcd.setCursor(0, 0);
  M5.Lcd.setTextColor(ORANGE);
  showBatteryStatus();
  M5.Lcd.print("Connecting to W-LAN...");
  wifiMulti.addAP(WLAN_SSID, WLAN_PASSWORD);
  for (int i = 0; i < MAX_RETRIES && wifiMulti.run() != WL_CONNECTED; i++) {
    M5.Lcd.print(".");
    delay(ONE_SECOND);
  }
  M5.Lcd.println();
  out(WiFi.localIP().toString(), WHITE, true);
  server.listen(PORT);
  M5.Lcd.print("Server available: ");
  if (server.available()) {
    out("Yes.", GREEN, true);
  } else {
    out("No.", RED, true);
  }
  out("\nA: Wait for connection", CYAN, true);
  out("B: Power Off", CYAN, true);
  out("C: Status\n", CYAN, true);
}

void loop() {
  M5.update();
  if (M5.BtnA.wasPressed()) {
    out("A> ", CYAN, false);
    doWebSocketServer();
    out("Done.", RED, true);
  } else if (M5.BtnB.wasPressed()) {
    out("B> ", CYAN, false);
    out("Going down...", RED, true);
    delay(1000);
    M5.shutdown();
  } else if (M5.BtnC.wasPressed()) {
    M5.Lcd.clear();
    M5.Lcd.setCursor(0, 0);
    out("C> ", CYAN, false);
    showStatus();
  }
}

void doWebSocketServer() {
  out(WiFi.localIP().toString(), WHITE, false);
  M5.Lcd.println(" waiting for incoming request...");
  WebsocketsClient client = server.accept();
  out("Got one.", GREEN, true);
  if (client.available()) {
    WebsocketsMessage msg = client.readBlocking();
    String message = msg.data();
    out(message, BLUE, true);
    if (message.startsWith("my")) {
      int pushes = -1;
      while (!done) {
        M5.update();
        if (M5.BtnB.wasPressed()) {
          out("B> ", CYAN, false);
          done = true;
        }
        M5.IMU.getAhrsData(&pitch, &roll, &yaw);
        int16_t steering = (int)pitch;
        steering *= 40;
        steering += 2048;
        steering = max(0, (int)steering);
        steering = min(4096, (int)steering);
        int16_t push = 4096;
        if (roll < 0) {
          if (pushes > 0) {
            push = pushes % 2 == 0 ? 0 : 4096;
            pushes--;
          }
        } else {
          pushes = 10;
        }
        char buffer[100];
        sprintf(buffer, "123:%d:%d", steering, push);
        client.send(buffer);
        delay(50);
      }
    }
    client.close();
    done = false;
  }
  delay(ONE_SECOND);
}

void showStatus() {
  M5.Spk.begin();
  M5.Spk.DingDong();

  showBatteryStatus();

  for (int i = 0; i < 3; i++) {
    M5.Axp.SetLDOEnable(3, true);
    M5.Axp.SetLed(1);
    delay(100);
    M5.Axp.SetLDOEnable(3, false);
    M5.Axp.SetLed(0);
    delay(100);
  }
}

void showBatteryStatus() {
  M5.Lcd.print("Battery: ");
  M5.Lcd.print(M5.Axp.GetBatteryLevel());
  M5.Lcd.println("%");
}

void out(String s, uint16_t color, bool newLine) {
  uint16_t savedColor = M5.Lcd.textcolor;
  M5.Lcd.setTextColor(color);
  if (newLine) {
    M5.Lcd.println(s);
  } else {
    M5.Lcd.print(s);
  }
  M5.Lcd.setTextColor(savedColor);
}
