function Player(opts) {
	// options:
		// angle
		// baseRadius
		// keyBindings
	this.renderColor = "#232323";
	this.sideLength = 22;
	this.keyBindings = [37, 39, 38]; //left / right arrow keys
	this.angle = 0;
	this.angularVelocity = 0;
	this.yOffset = 0;
	this.jumpForce = 15;
	this.yVelocity = 0;
	this.maxJumps = 3;
	this.jumps = 0;
	this.baseRadius = settings.baseRadius;
	this.acceleration = (1/180) * Math.PI;
	for (var i in opts) {
		this[i] = opts[i];
	}

	this.update = function(dt) {
		if (keys[this.keyBindings[2]]) {
			if (this.jumps < this.maxJumps) {
				this.jumps += 1;
				this.yVelocity = this.jumpForce;
			}

			keys[this.keyBindings[2]] = 0;
		}

		if (keys[this.keyBindings[0]]) {
			if (this.angularVelocity > 4 * this.acceleration) {
				this.angularVelocity -= 4 * this.acceleration;
			} else if (this.angularVelocity > 0) {
				this.angularVelocity = (this.angularVelocity - 4 * this.acceleration)/4;
			} else {
				this.angularVelocity -= this.acceleration;
			}
		}

		if (keys[this.keyBindings[1]]) {
			if (this.angularVelocity < -4 * this.acceleration) {
				this.angularVelocity += 4 * this.acceleration;
			} else if (this.angularVelocity < 0) {
				this.angularVelocity = (this.angularVelocity + 4 * this.acceleration)/4;
			} else {
				this.angularVelocity += this.acceleration;
			}
		}

		if (!keys[this.keyBindings[1]] && !keys[this.keyBindings[0]]) {
			if (this.angularVelocity < -4 * this.acceleration) {
				this.angularVelocity += 4 * this.acceleration;
			} else if (this.angularVelocity > 4 * this.acceleration) {
				this.angularVelocity -= 4 * this.acceleration
			} else {
				this.angularVelocity = 0;
			}
		}

		if (Math.abs(this.angularVelocity) > (4/180) * Math.PI) {
			this.angularVelocity = (4/180) * Math.PI * (this.angularVelocity < 0 ? -1 : 1);
		}

		this.yVelocity -= settings.gravity;
		this.yOffset += this.yVelocity;
		if (this.yOffset <= 0) {
			this.yOffset = 0;
			this.jumps = 0;
			this.yVelocity = 0;
		}

		this.angle += this.angularVelocity * dt;
		this.radius = this.baseRadius + this.yOffset;
	}

	this.draw = function() {
		drawRect(trueCanvas.width/2 + Math.cos(this.angle) * this.radius + (-this.sideLength/2) * Math.sin(2 * Math.PI - this.angle), trueCanvas.height/2 + Math.sin(this.angle) * this.radius + (-this.sideLength/2) * Math.cos(2 * Math.PI - this.angle), this.sideLength, this.color, this.angle);drawRect(trueCanvas.width/2 + Math.cos(this.angle) * this.radius + (-this.sideLength/2) * Math.sin(2 * Math.PI - this.angle), trueCanvas.height/2 + Math.sin(this.angle) * this.radius + (-this.sideLength/2) * Math.cos(2 * Math.PI - this.angle), this.sideLength, this.color, this.angle);
		drawRect(trueCanvas.width/2 + Math.cos((this.angle + Math.PI)) * this.radius + (-this.sideLength/2) * Math.sin(2 * Math.PI - (this.angle + Math.PI)), trueCanvas.height/2 + Math.sin((this.angle + Math.PI)) * this.radius + (-this.sideLength/2) * Math.cos(2 * Math.PI - (this.angle + Math.PI)), this.sideLength, this.color, (this.angle + Math.PI));drawRect(trueCanvas.width/2 + Math.cos((this.angle + Math.PI)) * this.radius + (-this.sideLength/2) * Math.sin(2 * Math.PI - (this.angle + Math.PI)), trueCanvas.height/2 + Math.sin((this.angle + Math.PI)) * this.radius + (-this.sideLength/2) * Math.cos(2 * Math.PI - (this.angle + Math.PI)), this.sideLength, this.color, (this.angle + Math.PI));
	};
}