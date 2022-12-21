class Car {

  PVector location;
  PVector velocity;
  PVector direction;
  PVector acceleration;
  float mass;
  float motorPower;
  float frictionCoefficient;
  float steeringAngle;

  Car() {
    location = new PVector(0, 0);
    velocity = new PVector(0, 0);
    direction = velocity.copy();
    acceleration = new PVector(0, 0);
  }

  void applyForce(PVector force) {
    // Receive a force, divide by mass, and add to acceleration.
    PVector f = PVector.div(force, mass);
    acceleration.add(f);
  }

  PVector getFriction() {
    PVector friction = car.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(frictionCoefficient);
    return friction;
  }

  PVector getSteeringForce() {
    PVector steering = car.velocity.copy();
    steering.rotate(PI/2);
    //steering.normalize();
    steering.mult(steeringAngle/10);
    return steering;
  }

  void push() {
    float angle = direction.heading();
    PVector motion = new PVector(cos(angle), sin(angle));
    motion.mult(motorPower);
    applyForce(motion);
  }


  void update() {
    applyForce(getFriction());
    if (velocity.mag() > 0.5) { // still driving:
      applyForce(getSteeringForce());
      direction = velocity.copy().normalize();
    }
    velocity.add(acceleration);
    location.add(velocity);
    acceleration.mult(0.0);
    checkBorders();
  }

  /**
   * Even though we said we shouldn't touch location and velocity directly, there are some exceptions.
   * Here we are doing so as a quick and easy way to reverse the direction of our object when it reaches the edge.
   */
  void checkBorders() {
    if (location.x > width) {
      location.x = width;
      velocity.x *= -1;
    } else if (location.x < 0) {
      velocity.x *= -1;
      location.x = 0;
    }

    if (location.y > height) {
      velocity.y *= -1;
      location.y = height;
    } else if (location.y < 0) {
      velocity.y *= -1;
      location.y = 0;
    }
  }
}
