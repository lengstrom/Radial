function Block(opts) {
	this.angle = 0;
	this.blockHeight = 20;
	this.iter = 5;
	this.angularWidth = Math.PI/5;
	this.distFromCenter = 400;
	for (var i in opts) {
		this[i] = opts[i];
	}

	this.draw = function() {
		var normalizedDist = this.distFromCenter * settings.scale;
		ctx.beginPath();
		ctx.fillStyle = '#f1c40f';
		ctx.arc(trueCanvas.width/2, trueCanvas.height/2, normalizedDist + this.blockHeight, this.angle + this.angularWidth/2, this.angle - this.angularWidth/2, true);
		ctx.lineTo(trueCanvas.width/2 + Math.cos(this.angle - this.angularWidth/2) * normalizedDist, trueCanvas.height/2 + Math.sin(this.angle - this.angularWidth/2) * normalizedDist);
		ctx.arc(trueCanvas.width/2, trueCanvas.height/2, normalizedDist, this.angle - this.angularWidth/2, this.angle + this.angularWidth/2, false);
		ctx.lineTo(trueCanvas.width/2 + Math.cos(this.angle + this.angularWidth/2) * (normalizedDist + this.blockHeight), trueCanvas.height/2 + Math.sin(this.angle + this.angularWidth/2) * (normalizedDist + this.blockHeight));
		ctx.fill();
		ctx.closePath();
	};

	this.update = function(dt) {
		this.distFromCenter -= this.iter * dt * settings.scale;
		if (this.distFromCenter <= settings.baseRadius * settings.scale) {
			this.distFromCenter = settings.baseRadius * settings.scale;
		}
	};
}