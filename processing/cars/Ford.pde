class Ford extends Car {

  float f = 2.0; //scale

  PShape all = createShape(GROUP);

  Ford() {
    motorPower = 1.8;
    frictionCoefficient = 0.05;
    mass = 1;

    PShape carosserie = createShape();
    carosserie.beginShape();
    carosserie.vertex(10, 10);
    carosserie.vertex(20, 10);
    carosserie.vertex(20, 14);
    carosserie.vertex(30, 14);
    carosserie.vertex(30, 16);
    carosserie.vertex(20, 16);
    carosserie.vertex(20, 20);
    carosserie.vertex(25, 24);
    carosserie.vertex(25, 46);
    carosserie.vertex(20, 48);

    carosserie.vertex(18, 48);
    carosserie.vertex(18, 50);
    carosserie.vertex(12, 50);
    carosserie.vertex(12, 48);

    carosserie.vertex(10, 48);
    carosserie.vertex(5, 46);
    carosserie.vertex(5, 24);
    carosserie.vertex(10, 20);
    carosserie.vertex(10, 16);
    carosserie.vertex(0, 16);
    carosserie.vertex(0, 14);
    carosserie.vertex(10, 14);
    carosserie.vertex(10, 10);
    carosserie.endShape(CLOSE);
    carosserie.translate(-15, -30);
    all.addChild(carosserie);

    // back wheels:
    all.addChild(createShape(RECT, -15, 10, 3, 10));
    all.addChild(createShape(RECT, 12, 10, 3, 10));
    all.scale(f);
    all.rotate(PI/2);

    rectMode(CENTER);
  }

  void display() {
    float angle = direction.heading();
    translate(location.x, location.y);
    pushMatrix();
    rotate(angle);
    //println("ford: " + angle);
    pushMatrix();// car
    shape(all);

    pushMatrix(); //left wheel
    scale(f);
    translate(15, -13);
    rotate(steeringAngle);
    rect(0, 0, 10, 3);
    popMatrix();
    pushMatrix(); // right wheel
    scale(f);
    translate(15, 13);
    rotate(steeringAngle);
    rect(0, 0, 10, 3);
    popMatrix();

    popMatrix();
    popMatrix();
  }
}
