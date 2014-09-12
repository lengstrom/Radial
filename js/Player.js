function Player(opts) {
	this.renderColor = "#232323";
	this.sideLength = 22;
	this.keyBindings = [37, 39, 38]; //left / right arrow keys
	this.jumps = 0;
	this.angle = 0;
	this.angularWidth = .2;
	this.angularVelocity = 0;
	this.yOffset = 0;
	this.yVelocity = 0;
	this.numBodies = 1;
	this.acceleration = (1/180) * Math.PI;
	this.bodies = [];

	this.init = function(opts) {
		for (var i in opts) {
			this[i] = opts[i];
		}

		var angleDiff = (Math.PI * 2) / this.numBodies;
		for (var i = 0; i < this.numBodies; i++) {
			this.bodies.push(angleDiff * i);
		}
	};

	this.update = function(dt) {
		var normalizedAcceleration = dt * this.acceleration;

		for (var x = 0; x < blocks.length; x++ ){
			// console.log(blocks[x].distFromCenter)
			if (isPlayerTouchingBlock(this, blocks[x])){
				//console.log("touch!");
			}			
			else {
				//console.log("no touch!");
			}
		}



		if (keys[this.keyBindings[2]]) {
			if (this.jumps < this.maxJumps) {
				this.jumps += 1;
				this.yVelocity = this.jumpForce;
			}

			keys[this.keyBindings[2]] = 0;
		}

		if (keys[this.keyBindings[0]]) {
			if (this.angularVelocity > 4 * normalizedAcceleration) {
				this.angularVelocity -= 4 * normalizedAcceleration;
			} else if (this.angularVelocity > 0) {
				this.angularVelocity = (this.angularVelocity - 4 * normalizedAcceleration)/4;
			} else {
				this.angularVelocity -= normalizedAcceleration;
			}
		}

		if (keys[this.keyBindings[1]]) {
			if (this.angularVelocity < -4 * normalizedAcceleration) {
				this.angularVelocity += 4 * normalizedAcceleration;
			} else if (this.angularVelocity < 0) {
				this.angularVelocity = (this.angularVelocity + 4 * normalizedAcceleration)/4;
			} else {
				this.angularVelocity += normalizedAcceleration;
			}
		}

		if (!keys[this.keyBindings[1]] && !keys[this.keyBindings[0]]) {
			if (this.angularVelocity < -4 * normalizedAcceleration) {
				this.angularVelocity += 4 * normalizedAcceleration;
			} else if (this.angularVelocity > 4 * normalizedAcceleration) {
				this.angularVelocity -= 4 * normalizedAcceleration
			} else {
				this.angularVelocity = 0;
			}
		}

		if (Math.abs(this.angularVelocity) > this.MaxAngularVelocity) {
			this.angularVelocity = this.maxAngularVelocity * (this.angularVelocity < 0 ? -1 : 1);
		}

		this.angle += this.angularVelocity * dt;

		this.yVelocity -= settings.gravity * dt;
		this.yOffset += this.yVelocity * dt;
		if (this.yOffset <= 0) {
			this.yOffset = 0;
			this.jumps = 0;
			this.yVelocity = 0;
		}

		var players = [player1];
			if ('player2' in window) {
				players.push(player2);
			}

		for(var x = 0; x < players.length; x++ ){
			if(isPLayerTouchingPlayer(this, players[x]) && this !== players[x]){
				console.log("P1/P2 Touching");
				this.angularVelocity = 0;
			}
		}
		
		
		this.radius = settings.baseRadius + this.yOffset;
		
		for(var x = 0; x < players.length; x++ ){
			if(isPLayerTouchingPlayer(this, players[x]) && this !== players[x]){
				console.log("P1/P2 Touching");
				this.angle -= this.angularVelocity * dt;
				this.angularVelocity = 0;
			}
		}
		var twoPI = Math.PI * 2;
		if (this.angle < 0) this.angle += twoPI;
		if (this.angle > twoPI) this.angle -= twoPI;
		this.radius = settings.baseRadius + this.yOffset;
	};

	this.draw = function() {
		for (var i = 0; i < this.bodies.length; i++) {
			var angle = this.bodies[i] + this.angle;
			var ss = settings.scale;
			
			//console.log("Begin Draw Cone");
			//console.log("gdr: " +  gdr);

			//Figure out proper angle for height.
			/*
			var trueWidth = 1; //how many radians wide it is at baseradius
			var floorRadius = (settings.baseRadius + gdr);
			var floorCircumference = (floorRadius)*6.28;
			console.log("floorCircumference " + isNaN(floorCircumference));
			var percentageOfCircle = trueWidth/floorCircumference;

			//converttowidth
			var bottomX = floorRadius * Math.cos(angle+1/2); 
			var bottomY = floorRadius * Math.sin(angle+1/2);
			
			var topX = floorRadius * Math.cos(angle-1/2);
			var topY = floorRadius * Math.sin(angle-1/2);

			distBetweenPoints = Math.sqrt((topY-bottomY)*(topY-bottomY) + (topX-bottomX)*(topX-bottomX));
			console.log("TrueWidth" + distBetweenPoints);

			var bottomDistanceMax = Math.sqrt(bottomX^2 + bottomY^2);
			var DistanceMax = Math.sqrt(topX^2 + topY^2);

			console.log("bottom: (" + bottomX + " " + bottomY + "), top : (" + topX + " " + topY + ")");
			console.log("percentageOfCircle " + isNaN(percentageOfCircle));
			var currentCircumference = this.radius*6.28;
			console.log("currentCircumference " + currentCircumference);
			var finalWidth = currentCircumference*percentageOfCircle;
			console.log("finalWidth: " + finalWidth);
			finalWidth = finalWidth/2;
			if(this.radius > 140) debugger;
			*/

			drawConeSectionFromCenter(trueCanvas.width/2, trueCanvas.height/2, (this.angle + this.angularWidth/2), (this.angle - this.angularWidth/2), this.sideLength, this.radius + gdr, "#FFFFFF");
			//console.log("End Draw Cone");
			
			//drawRect(trueCanvas.width/2 + ss * Math.cos(angle) * this.radius + (-this.sideLength/2) * Math.sin(2 * Math.PI - angle) * ss, trueCanvas.height/2 + Math.sin(angle) * this.radius * ss + (-this.sideLength/2) * Math.cos(2 * Math.PI - angle) * ss, this.sideLength, this.color, angle, (this.yOffset == 0));
		}
	};

	this.init(opts);
}

Player.prototype.jumpForce = 16;
Player.prototype.maxJumps = 3;
Player.prototype.maxAngularVelocity = 5/180 * Math.PI