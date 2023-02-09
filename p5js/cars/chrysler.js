class Chrysler extends Automobile {

    constructor(x, y) {
        super();
        this.aScale = 2;
        this.steeringAngle = -0.5;
    }

    paint() {
        push();
        //scale(2);
        translate(this.location.x, this.location.y);
        rotate(this.direction.heading());
        rotate(PI/2);
        this.paintBody();
        this.paintFrontWheels();
        this.paintBackWheels();
        pop();
    }

    paintBody() {
        beginShape();
        vertex(-5, -20);
        vertex(5, -20);
        vertex(5, -16);
        vertex(15, -16);
        vertex(15, -14);
        vertex(5, -14);
        vertex(5, -10);
        vertex(10, -6);
        vertex(10, 16);
        vertex(5, 18);

        vertex(3, 18);
        vertex(3, 20);
        vertex(-3, 20);
        vertex(-3, 18);

        vertex(-5, 18);
        vertex(-10, 16);
        vertex(-10, -6);
        vertex(-5, -10);
        vertex(-5, -14);
        vertex(-15, -14);
        vertex(-15, -16);
        vertex(-5, -16);
        vertex(-5, -20);
        endShape(CLOSE);
    }

    paintFrontWheels() {
        push(); // left wheel
        translate(-13, -15);
        rotate(this.steeringAngle);
        rect(-1.5, -5, 3, 10);
        pop();
        push(); //right wheel
        translate(13, -15);
        rotate(this.steeringAngle);
        rect(-1.5, -5, 3, 10);
        pop();
    }

    paintBackWheels() {
        push(); //left wheel
        translate(-14, 15);
        rect(-1.5, -5, 3, 10);
        pop();
        push(); // right wheel
        translate(14, 15);
        rect(-1.5, -5, 3, 10);
        pop();
    }
    

}