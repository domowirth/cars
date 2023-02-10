class Chrysler extends Automobile {

    constructor(x, y) {
        super();
        this.aScale = 2;
        this.steeringAngle = -0.5;
    }

    paint() {
        push();
        translate(this.location.x, this.location.y);
        rotate(this.direction.heading());
        rotate(PI/2);
        fill(196, 222, 222);
        this.paintBody();
        fill(255, 255, 255);
        this.paintFrontWheels();
        this.paintBackWheels();
        pop();
    }

    paintBody() {
        beginShape();
        curveVertex(-5, -22);
        curveVertex(0, -23);
        curveVertex(5, -22);
        curveVertex(5, -16);
        curveVertex(15, -16);
        curveVertex(15, -14);
        curveVertex(5, -14);
        curveVertex(5, -10);
        curveVertex(10, -6);
        curveVertex(10, 16);
        curveVertex(5, 18);

        curveVertex(3, 18);
        curveVertex(3, 20);
        curveVertex(-3, 20);
        curveVertex(-3, 18);

        curveVertex(-5, 18);
        curveVertex(-10, 16);
        curveVertex(-10, -6);
        curveVertex(-5, -10);
        curveVertex(-5, -14);
        curveVertex(-15, -14);
        curveVertex(-15, -16);
        curveVertex(-5, -16);
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