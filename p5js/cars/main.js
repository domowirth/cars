let car;
let oldPushButtonState;

function setup() {
    let canvas = createCanvas(windowWidth - 20, windowHeight * 0.75);
    //canvas.parent('sketchContainer');
    car = new Chrysler();
    car.location.x = width / 10;
    car.location.y = 100;
    oldPushButtonState = 4096;

    createWebSocket();
    
    console.log("Setup done");
}

function createWebSocket() {
    
    let webSocket = new WebSocket("ws://192.168.1.104:80/test");

    webSocket.onopen = function (e) {
        webSocket.send("my Chrysler");
    };

    webSocket.onmessage = function (event) {
        messageReceived(event.data);
    };

    webSocket.onclose = function (event) {
        if (event.wasClean) {
            alert("Connection closed properly, code=${event.code} reason=${event.reason}");
        } else {
            alert("Connection died");
        }
    };

    webSocket.onerror = function (error) {
        alert("An error occurred.");
    };
}

function draw() {
    background(226, 224, 204);
    car.update();
    car.paint();
}

function messageReceived(data) {
    let parts = split(trim(data), ":");
    if (parts.length > 2) {
        let steering = float(trim(parts[1]));
        steering = steering / 4096;
        steering -= 0.5;
        if (car != null) {
            car.steeringAngle = steering;
        }
        let push = int(trim(parts[2]));
        if (oldPushButtonState > 1000 && push < 1000) {
            car.push();
        }
        oldPushButtonState = push;
    }
}


