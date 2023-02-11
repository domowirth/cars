class Chrysler extends Automobile {

    constructor(x, y) {
        super();
        this.mass = 1;
        this.motorPower = 1.8;
        this.frictionCoefficient = 0.05;
        this.steeringAngle = -0.5;
        this.body = [
            [0, -23], [5, -22], [5, -16], [15, -16],
            [15, -14], [5, -14], [5, -10], [10, -6], [10, 16],
            [5, 18], [3, 18], [3, 20],
            [-3, 20], [-3, 18], [-5, 18],
            [-10, 16], [-10, -6], [-5, -10], [-5, -14], [-15, -14],
            [-15, -16], [-5, -16], [-5, -22]
        ];
    }

    paint() {
        push();
        translate(this.location.x, this.location.y);
        rotate(this.direction.heading());
        rotate(PI / 2);
        fill(196, 222, 222);
        this.paintBody();
        fill(255, 255, 255);
        this.paintFrontWheels();
        this.paintBackWheels();
        pop();
    }

    paintBody() {
        beginShape();
        this.body.forEach ((point, n)  => {
            curveVertex(point[n, 0], point[n, 1]);
        });
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