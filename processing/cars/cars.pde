import websockets.*;

Ford car;
WebsocketClient wsc;

float delta;
float oldPushButtonState;

void setup() {
  //  wsc = new WebsocketClient(this, "ws://192.168.4.1:80"); // STM und ESP8266
  //  wsc.sendMessage("mice");
  wsc = new WebsocketClient(this, "ws://192.168.1.127:80"); // M5Core2
  wsc.sendMessage("myFord");
  size(1200, 800);
  smooth();
  car = new Ford();
  delta = 0.01;
  car.location.x = width/10;
  car.location.y = height/2;
  oldPushButtonState = 4096;
}

void draw() {
  background(color(128));
  car.update();
  car.display();
}

void webSocketEvent(String msg) {
  println(msg);
  String[] parts = msg.split(":");
  if (parts.length > 2) {
    try {
      float steering = Integer.parseInt(parts[1].trim());
      steering = steering/4096;
      steering -= 0.5;
      if (car != null) {
        car.steeringAngle = steering;
      }
      float push = Integer.parseInt(parts[2].trim());
      if (oldPushButtonState > 1000 && push < 1000) {
        car.push();
      }
      oldPushButtonState = push;
    }
    catch(NumberFormatException e) {
      // bad data
    }
  }
}

void keyPressed(KeyEvent e) {
  car.push();
}
