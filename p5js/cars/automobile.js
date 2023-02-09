class Automobile {

    constructor() {
        this.location = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.direction = createVector(0, 0)
        this.acceleration = createVector(0, 0);
        this.mass = 1;
        this.motorPower = 1.8;
        this.frictionCoefficient = 0.05;
        this.steeringAngle = 0;
    }

    applyForce(force) {
        // Receive a force, divide by mass, and add to acceleration.
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    getFriction() {
        let friction = this.velocity.copy();
        friction.mult(-1);
        friction.normalize();
        friction.mult(this.frictionCoefficient);
        return friction;
    }

    getSteeringForce() {
        let steering = this.velocity.copy();
        steering.rotate(PI/2);
        steering.mult(this.steeringAngle / 10);
        return steering;
    }

    push() {
        let angle = this.direction.heading();
        let motion = createVector(cos(angle), sin(angle));
        motion.mult(this.motorPower);
        this.applyForce(motion);
    }

    update() {
        this.applyForce(this.getFriction());
        if (this.velocity.mag() > 0.5) { // still driving:
            this.applyForce(this.getSteeringForce());
            this.direction = this.velocity.copy().normalize();
        }
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0.0);
        this.checkBorders();
    }

    /**
     * Even though we said we shouldn't touch location and velocity directly, there are some exceptions.
     * Here we are doing so as a quick and easy way to reverse the direction of our object when it reaches the edge.
     */
    checkBorders() {
        if (this.location.x > width) {
            this.location.x = width;
            this.velocity.x *= -1;
        } else if (this.location.x < 0) {
            this.velocity.x *= -1;
            this.location.x = 0;
        }

        if (this.location.y > height) {
            this.velocity.y *= -1;
            this.location.y = height;
        } else if (this.location.y < 0) {
            this.velocity.y *= -1;
            this.location.y = 0;
        }
    }

}

