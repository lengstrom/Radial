function Player(opts) {
	// options:
		// angle
		// baseRadius
		// keyBindings
	this.renderColor = "#232323";
	this.sideLength = 22;
	this.keyBindings = [37, 39]; //left / right arrow keys
	this.angle = 0;
	this.baseRadius = settings.baseRadius;
	for (var i in opts) {
		this[i] = opts[i];
	}

	this.update = function() {
		if (keys[this.keyBindings[0]]) {
			this.angle -= (5/180) * Math.PI;
		}

		if (keys[this.keyBindings[1]]) {
			this.angle += (5/180) * Math.PI;
		}
	}

	this.draw = function() {
		drawRect(trueCanvas.width/2 + Math.cos(this.angle) * this.baseRadius + (-this.sideLength/2) * Math.sin(2 * Math.PI - this.angle), trueCanvas.height/2 + Math.sin(this.angle) * this.baseRadius + (-this.sideLength/2) * Math.cos(2 * Math.PI - this.angle), this.sideLength, this.color, this.angle);
	};
}